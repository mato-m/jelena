const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4 } = require("uuid");
const verifyToken = require("../middleware/auth.js");
const path = require("path");
const fs = require("fs");
router.post("/", verifyToken, (req, res) => {
  const { name_sr, name_en } = req.body;
  if (!name_sr || !name_en) {
    return res.status(400).send({ status: 1, data: "Podaci nisu unešeni" });
  }
  const query = `INSERT INTO Categories (id, name_sr, name_en) VALUES (?, ?, ?)`;
  db.run(query, [v4(), name_sr, name_en], function (err) {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri dodavanju kategorije" });
    }
    res.status(200).send({ status: 0, data: "Kategorija dodata" });
  });
});

router.get("/", (req, res) => {
  const query = `SELECT * FROM Categories`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri učitavanju kategorija" });
    }
    res.status(200).json({ status: 0, data: rows });
  });
});

router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const fetchQuery = `SELECT * FROM Paintings WHERE category_id = ?`;
  db.all(fetchQuery, [id], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri brisanju kategorije" });
    }

    rows.forEach((row) => {
      const imagePath = path.join(
        __dirname,
        "../public",
        "paintings",
        row.image_url
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res.status(500).send({
            status: 1,
            data: "Greška pri brisanju slika iz kategorije",
          });
        }
      });
    });
    const deleteQuery = `DELETE FROM Categories WHERE id = ?`;
    db.run(deleteQuery, [id], function (err) {
      if (err) {
        return res
          .status(500)
          .send({ status: 1, data: "Greška pri brisanju kategorije" });
      }
      res.status(200).send({ status: 0, data: "Kategorija obrisana" });
    });
  });
});
module.exports = router;
