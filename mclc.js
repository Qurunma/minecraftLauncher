const runMine = (version) => {
  const MCLC = require("minecraft-launcher-core");
  const { Client, Authenticator } = MCLC;
  const launcher = new Client();

  let opts = {
    window: {
      fullscreen: true,
    },
    clientPackage: null,
    authorization: Authenticator.getAuth("XFD"),
    root: "./minecraft",
    version: {
      number: version,
      type: "release",
    },
    memory: {
      max: "6G",
      min: "4G",
    },
    // forge: "C:/Users/Blockchain/Downloads/forge-1.14.4-28.2.26-installer.jar",
  };

  launcher.launch(opts);

  launcher.on("debug", (e) => console.log(e));
  launcher.on("data", (e) => console.log(e));
};
// runMine();
module.exports.launcher = runMine;
