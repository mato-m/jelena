const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const catQuery = `SELECT * FROM Categories`;
  const exQuery = `SELECT * FROM Exhibitions ORDER BY exhibition_date DESC`;
  const paintQuery = `SELECT * FROM Paintings ORDER BY date DESC`;
  const pressQuery = `SELECT * FROM Press ORDER BY published_date DESC`;

  db.all(catQuery, [], (err, catRows) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri učitavanju kategorija" });
    }
    db.all(exQuery, [], (err, exRows) => {
      if (err) {
        return res
          .status(500)
          .send({ status: 1, data: "Greška pri učitavanju izložbi" });
      }
      db.all(paintQuery, [], (err, paintRows) => {
        if (err) {
          return res
            .status(500)
            .send({ status: 1, data: "Greška pri učitavanju slika" });
        }
        db.all(pressQuery, [], (err, pressRows) => {
          if (err) {
            return res
              .status(500)
              .send({ status: 1, data: "Greška pri učitavanju članaka" });
          }
          res.status(200).json({
            status: 0,
            data: {
              categories: catRows,
              exhibitions: exRows,
              paintings: paintRows,
              press: pressRows,
            },
          });
        });
      });
    });
  });
});

module.exports = router;
