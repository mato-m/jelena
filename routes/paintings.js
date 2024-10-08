const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");
const verifyToken = require("../middleware/auth");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../public", "paintings");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the correct directory path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("image");

router.post("/", verifyToken, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // Multer file upload error
      console.log("File upload error:", err);
      return res
        .status(400)
        .send({ status: 1, data: "Greška prilikom učitavanja fajla." });
    }

    if (!req.file) {
      // No file uploaded
      return res.status(400).send({ status: 1, data: "Fajl nije uploadovan." });
    }

    const { category_id } = req.body;
    const image_url = req.file.filename;

    if (!category_id || !image_url) {
      return res.status(400).send({ status: 1, data: "Podaci nisu unešeni" });
    }

    const image_id = v4();
    const query = `INSERT INTO Paintings (id, image_url, category_id, date) VALUES (?, ?, ?, ?)`;

    db.run(
      query,
      [image_id, image_url, category_id, new Date()],
      function (err) {
        if (err) {
          console.log("Database error:", err);
          return res
            .status(500)
            .send({ status: 1, data: "Greška pri dodavanju slike" });
        }

        res.status(200).send({ status: 0, data: "Slika uspješno dodata" });
      }
    );
  });
});

router.get("/", (req, res) => {
  const query = `SELECT * FROM Paintings ORDER BY date DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri učitavanju slika" });
    }
    res.status(200).json({ status: 0, data: rows });
  });
});

router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const fetchQuery = `SELECT * FROM Paintings WHERE id = ?`;
  db.get(fetchQuery, [id], (err, row) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 1, data: "Greška pri brisanju slike" });
    }

    const imagePath = path.join(
      __dirname,
      "../public",
      "paintings",
      row.image_url
    );
    fs.unlink(imagePath, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ status: 1, data: "Greška pri brisanju slike" });
      }

      const deleteQuery = `DELETE FROM Paintings WHERE id = ?`;
      db.run(deleteQuery, [id], function (err) {
        if (err) {
          return res
            .status(500)
            .send({ status: 1, data: "Greška pri brisanju slike" });
        }
        res.status(200).send({ status: 0, data: "Slika obrisana" });
      });
    });
  });
});

module.exports = router;
