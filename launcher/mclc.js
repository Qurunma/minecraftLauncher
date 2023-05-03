const runMine = (version) => {
  const MCLC = require("minecraft-launcher-core");
  const { Client, Authenticator } = MCLC;
  const launcher = new Client();

  const os = require("os");

  const fswin = require("fswin");
  const fs = require("fs");
  const minePath = os.homedir() + "/AppData/Roaming/.bao";

  fs.mkdir(minePath, (err) => {
    console.log(err);
  });
  fs.mkdir(minePath + "/mods", (err) => {
    console.log(err);
  });

  fs.readdir(minePath + "/mods", async (err, modsOnClient) => {
    if (err) console.log(err);
    const modsFromServer = await fetch("http://localhost:3000").then((res) =>
      res.json()
    );
    if (modsFromServer != modsOnClient) {
      modsFromServer.filter((a) => modsOnClient.indexOf(a) == -1);
      modsFromServer.forEach((element) => {
        fetch(`http://localhost:3000/${element}`)
          .then((res) => {
            console.log(res.blob());
          })
          .catch((err) => {
            console.error(err);
          });
      });
    }
  });

  fswin.setAttributesSync(os.homedir() + "/AppData/Roaming/.bao", {
    IS_HIDDEN: true,
  });

  let opts = {
    window: {
      fullscreen: true,
    },
    clientPackage: null,
    authorization: Authenticator.getAuth("XFD"),
    root: os.homedir() + "/AppData/Roaming/.bao",
    version: {
      number: version,
      type: "release",
    },
    memory: {
      max: "6G",
      min: "4G",
    },
  };

  launcher.launch(opts);

  launcher.on("debug", (e) => console.log(e));
  launcher.on("data", (e) => console.log(e));
};
module.exports.launcher = runMine;
