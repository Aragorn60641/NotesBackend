const express = require("express");
require('dotenv').config()
const app = express();
const port = 5000;
const cors = require("cors");
const { notesRouter } = require("./api/v1/index")
require('./db')

app.use(cors());

app.use(express.json())

app.get("/", (req, res) => {
  res.send("this is for the practise");
});

app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`practise app listens on http://localhost:${port}`);
});
