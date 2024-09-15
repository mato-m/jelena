const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite3", (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  }
});
db.run("PRAGMA foreign_keys = ON");
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Categories (
      id TEXT PRIMARY KEY,
      name_sr TEXT NOT NULL,
      name_en TEXT NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Paintings (
      id TEXT PRIMARY KEY NOT NULL,
      image_url TEXT NOT NULL,
      category_id TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Press (
      id TEXT PRIMARY KEY NOT NULL,
      title_sr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      link TEXT NOT NULL,
      published_date DATE NOT NULL,
      article_source TEXT NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Exhibitions (
      id TEXT PRIMARY KEY NOT NULL,
      title_sr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      location_sr TEXT NOT NULL,
      location_en TEXT NOT NULL,
      exhibition_date DATE NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Users (
      id TEXT PRIMARY KEY NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`);
});
module.exports = db;
