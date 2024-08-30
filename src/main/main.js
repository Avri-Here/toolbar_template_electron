





const path = require('path')
const { app, BrowserWindow } = require('electron');
require('electron-reload')(path.join(__dirname, '../..'));
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 100,
        center: true,
        frame: false,
        transparent: true,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('src/renderer/app/app.html');

    mainWindow.on("ready-to-show", () => {
        const isDev = process.defaultApp || /[\\/]electron[\\/]/.test(process.execPath);
        if (isDev) {
            mainWindow.webContents.openDevTools({ mode: 'undocked' });
        }
    });

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
