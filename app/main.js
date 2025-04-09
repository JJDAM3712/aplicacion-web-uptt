import { app, BrowserWindow } from 'electron';
import path from 'path';
import { getDirname } from './src/utils/dirname';
const __dirname = getDirname(import.meta.url);
let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            sandbox: true,
            contextIsolation: true
        },
    });
    mainWindow.loadFile(path.join(__dirname, 'src/index.html'));
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
