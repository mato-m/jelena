require("dotenv").config();
const express = require("express");
const path = require("path");
const next = require("next");
const db = require("./db");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/_next", express.static(path.join(__dirname, ".next")));

app.use("/api/categories", require("./routes/categories"));
app.use("/api/paintings", require("./routes/paintings"));
app.use("/api/press", require("./routes/press"));
app.use("/api/exhibitions", require("./routes/exhibitions"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/all", require("./routes/all"));
app.disable("x-powered-by");
nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  process.on("SIGINT", () => {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database", err);
      } else {
        console.log("Database connection closed");
      }
      process.exit(0);
    });
  });
});
