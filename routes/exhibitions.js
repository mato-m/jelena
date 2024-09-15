const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");
const { v4 } = require("uuid");

router.post("/", verifyToken, (req, res) => {
  const { title_sr, title_en, location_sr, location_en, exhibition_date } =
    req.body;
  if (
    !title_sr ||
    !title_en ||
    !location_sr ||
    !location_en ||
    !exhibition_date
  ) {
    return res.status(400).send({ status: 1, data: "Podaci nisu unešeni" });
  }
  const query = `INSERT INTO Exhibitions (id, title_sr, title_en, location_sr, location_en,exhibition_date) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(
    query,
    [v4(), title_sr, title_en, location_sr, location_en, exhibition_date],
    function (err) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ status: 1, data: "Greška pri dodavanju izložbe" });
      }
      res.status(200).send({ status: 0, data: "Izložba dodata" });
    }
  );
});

router.get("/", (req, res) => {
  const query = `SELECT * FROM Exhibitions ORDER BY exhibition_date DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri učitavanju izložbi" });
    }
    res.status(200).json({ status: 0, data: rows });
  });
});

router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Exhibitions WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri brisanju izložbe" });
    }
    res.status(200).send({ status: 0, data: "Izložba obrisana" });
  });
});

module.exports = router;
