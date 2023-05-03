import express from "express";
import fs from "node:fs";
import os from "node:os";

const app = express();
const minePath = os.homedir() + "/Documents/mods";

app.get("/", (req, res) => {
  fs.readdir(minePath, (err, files) => {
    console.log(err);
    res.json(files);
  });
});

app.get("/download/:name", (req, res) => {
  const filename = req.params.name;
  res.download(minePath + "/" + filename);
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
