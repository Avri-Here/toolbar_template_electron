





const path = require('path')
const { globalShortcut } = require('electron');
const { app, BrowserWindow, screen } = require('electron');
require('electron-reload')(path.join(__dirname, '../..'));


const createToolBar = () => {

    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

    const x = Math.floor((screenWidth - 270) / 2);
    const y = screenHeight - 55;

    const mainWindow = new BrowserWindow({
        width: 270,
        height: 50,
        x: x,
        y: y,
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


    // mainWindow.setIgnoreMouseEvents(true, { forward: true });

    mainWindow.loadFile('src/renderer/app/app.html');



    globalShortcut.register('Control+2', () => {
        mainWindow.setPosition(x, y);
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });


    mainWindow.on("ready-to-show", () => {
        const isDev = process.defaultApp || /[\\/]electron[\\/]/.test(process.execPath);
        if (isDev) {
            mainWindow.webContents.openDevTools({ mode: 'undocked' });
        }
    });

}

app.whenReady().then(createToolBar);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createToolBar();
    }
});























