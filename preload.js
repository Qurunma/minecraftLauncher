const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  launch: () => {
    ipcRenderer.invoke("launch");
  },
});
