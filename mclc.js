const runMine = (version) => {
	const MCLC = require("minecraft-launcher-core");
	const { Client, Authenticator } = MCLC;
	const launcher = new Client();

	const os = require("os");

	// const path = os.homedir() + "/AppData/Roaming/.bao";

	const fswin = require("fswin");
	const fs = require("fs");

	fs.mkdir(os.homedir() + "/AppData/Roaming/.bao", (err) => {});

	// fs.access(os.homedir() + "/AppData/Roaming/.bao", (e) => {
	// 	console.log(1);
	// 	if (e) {
	// 	}
	// });

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
		// forge: "C:/Users/Blockchain/Downloads/forge-1.14.4-28.2.26-installer.jar",
	};

	launcher.launch(opts);

	launcher.on("debug", (e) => console.log(e));
	launcher.on("data", (e) => console.log(e));
};
// runMine();
module.exports.launcher = runMine;
