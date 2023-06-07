const runMine = (version) => {
  const MCLC = require("minecraft-launcher-core");
  const { app, BrowserWindow, ipcMain } = require("electron");

  const { Client, Authenticator } = MCLC;
  const launcher = new Client();

  const os = require("os");

  const fswin = require("fswin");
  const fs = require("fs");
  const minePath = os.homedir() + "/AppData/Roaming/.minecraft";

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
      modsFromServer.forEach(async (element) => {
        const window = new BrowserWindow({
          width: 940,
          height: 588,
        });
        window.loadURL("http://localhost:3000/download/" + element);
        window.webContents.session.on(
          "will-download",
          (event, item, webContents) => {
            // Set the save path, making Electron not to prompt a save dialog.
            item.setSavePath(
              app.getPath("downloads") + "/" + item.getFilename()
            );

            item.on("updated", (event, state) => {
              if (state === "interrupted") {
                console.log("Download is interrupted but can be resumed");
              } else if (state === "progressing") {
                if (item.isPaused()) {
                  console.log("Download is paused");
                } else {
                  console.log(
                    `Received bytes: ${item.getReceivedBytes()}, ${item.getTotalBytes()}`
                  );
                }
              }
            });
            item.once("done", (event, state) => {
              if (state === "completed") {
                console.log("Download successfully");
                console.log(minePath + "/mods/" + item.getFilename());
                fs.rename(
                  os.homedir() + "/downloads/" + item.getFilename(),
                  minePath + "/mods/" + item.getFilename(),
                  (err) => {
                    console.log(err);
                  }
                );
              } else {
                console.log(`Download failed: ${state}`);
              }
            });
          }
        );
      });
    }
  });

  fswin.setAttributesSync(os.homedir() + "/AppData/Roaming/.minecraft", {
    IS_HIDDEN: true,
  });

  let opts = {
    window: {
      fullscreen: true,
    },
    clientPackage: null,
    authorization: Authenticator.getAuth("XFD"),
    root: os.homedir() + "/AppData/Roaming/.minecraft",
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
