const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const db = require("../db");
const nodemailer = require("nodemailer");
dotenv.config();
router.post("/mail", (req, res) => {
  const { ime, email, poruka } = req.body;
  if (!ime || !email || !poruka) {
    return res.status(400).send({
      status: 1,
      data: "Podaci nisu unešeni",
    });
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      status: 1,
      data: "Email nije u validnom formatu",
    });
  }
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Poruka od ${ime} (${email})`,
    text: `Email od ${ime} (${email}) \n Poruka: ${poruka}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).send({
        status: 1,
        data: "Greška pri slanju poruke",
      });
    } else {
      return res.status(200).send({
        status: 0,
        data: "Poruka poslata",
      });
    }
  });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      status: 1,
      data: "Podaci nisu unešeni",
      auth: false,
      token: null,
    });
  }
  const query = `SELECT * FROM Users WHERE username = ?`;
  db.get(query, [username], (err, user) => {
    if (err) {
      return res.status(500).send({
        status: 1,
        data: "Greška pri logovanju",
        auth: false,
        token: null,
      });
    }
    if (!user) {
      return res.status(404).send({
        status: 1,
        data: "Korisnik nije pronađen",
        auth: false,
        token: null,
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        status: 1,
        data: "Pogrešna lozinka",
        auth: false,
        token: null,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res
      .status(200)
      .send({ status: 0, data: "Uspešno logovanje", auth: true, token: token });
  });
});

module.exports = router;
