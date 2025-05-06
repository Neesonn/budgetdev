const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (data, type) => ipcRenderer.invoke('save-file', data, type),
}); 