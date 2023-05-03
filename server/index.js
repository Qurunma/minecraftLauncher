import express from "express";
import fs from "node:fs";
import os from "node:os";

const app = express();
const minePath = os.homedir() + "/Documents/mods";

app.use(express.static(minePath));

app.get("/", (req, res) => {
  fs.readdir(minePath, (err, files) => {
    console.log(err);
    res.json(files);
  });
});

app.listen(3000);
