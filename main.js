const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

let serveProcess
let mainWindow

function createWindow(port) {
  console.log('Creating Electron window on port:', port)
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  mainWindow.loadURL(`http://localhost:${port}`)
  mainWindow.on('closed', () => {
    mainWindow = null
    if (serveProcess) serveProcess.kill()
  })
}

function startServerAndApp() {
  const isWin = process.platform === 'win32';
  const npxCmd = isWin ? 'npx.cmd' : 'npx';
  console.log('Spawning:', npxCmd, ['serve', '-s', 'out', '-l', '0']);
  serveProcess = spawn(npxCmd, ['serve', '-s', 'out', '-l', '0'])

  serveProcess.stdout.on('data', (data) => {
    const output = data.toString()
    console.log('serve output:', output)
    // Look for the line with "Accepting connections at http://localhost:PORT"
    const match = output.match(/Accepting connections at http:\/\/localhost:(\d+)/)
    if (match) {
      const port = match[1]
      createWindow(port)
    }
    process.stdout.write(data)
  })

  serveProcess.stderr.on('data', (data) => {
    process.stderr.write(data)
  })

  serveProcess.on('close', (code) => {
    if (mainWindow) mainWindow.close()
  })
}

app.whenReady().then(() => {
  startServerAndApp()
  ipcMain.handle('save-file', async (event, data, fileType) => {
    const filters = fileType === 'csv'
      ? [{ name: 'CSV Files', extensions: ['csv'] }]
      : [{ name: 'JSON Files', extensions: ['json'] }];
    const { filePath } = await dialog.showSaveDialog({
      filters,
      defaultPath: fileType === 'csv' ? 'data.csv' : 'data.json',
    });
    if (filePath) {
      fs.writeFileSync(filePath, data);
      return true;
    }
    return false;
  });
})

app.on('window-all-closed', () => {
  if (serveProcess) serveProcess.kill()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    startServerAndApp()
  }
}) 