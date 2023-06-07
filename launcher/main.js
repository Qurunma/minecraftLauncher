const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const launcher = require("./mclc");
const os = require("os");

app.disableHardwareAcceleration();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 929,
    height: 558,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    resizable: false,
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.openDevTools();
  ipcMain.handle("launch", (event, version) => {
    launcher.launcher(version);
  });
  mainWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
