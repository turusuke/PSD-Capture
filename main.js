const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const PSD = require('psd');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 400,
    resizable: false,
    center: true,
    frame: true,
    titleBarStyle: 'hidden'
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();
  win.on('closed', () => win = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : '');
app.on('activate', () => win === null ? createWindow() : '');