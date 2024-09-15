const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4 } = require("uuid");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, (req, res) => {
  const { source, title_sr, title_en, link, published_date } = req.body;
  if (!source || !title_sr || !title_en || !link || !published_date) {
    return res.status(400).send({ status: 1, data: "Podaci nisu unešeni" });
  }
  if (!link.includes("http://") && !link.includes("https://")) {
    return res
      .status(400)
      .send({ status: 1, data: "Link nije u ispravnom formatu" });
  }
  const query = `INSERT INTO Press (id,title_sr, title_en, link, published_date,article_source) VALUES (?,?, ?, ?, ?,?)`;
  db.run(
    query,
    [v4(), title_sr, title_en, link, published_date, source],
    function (err) {
      if (err) {
        return res
          .status(500)
          .send({ status: 1, data: "Greška pri dodavanju članka" });
      }
      res.status(200).send({ status: 0, data: "Članak dodat" });
    }
  );
});

router.get("/", (req, res) => {
  const query = `SELECT * FROM Press ORDER BY published_date DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri učitavanju članaka" });
    }
    res.status(200).json({ status: 0, data: rows });
  });
});

router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Press WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri brisanju članka" });
    }
    res.status(200).send({ status: 0, data: "Članak obrisan" });
  });
});

module.exports = router;
