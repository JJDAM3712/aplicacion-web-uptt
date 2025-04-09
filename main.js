import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'assets', 'liceo.ico')
  });

  // Carga la aplicación React
  const startUrl = new URL(path.join(__dirname, './client/dist/index.html'), `file://${__dirname}/`).toString();
  mainWindow.loadURL(startUrl);

  // Iniciar el servidor backend (pasando el puerto como argumento)
  const port = process.env.PORT || 4000;
  const backendScriptPath = path.join(app.getAppPath(), 'server', 'dist', 'app.js');
  backendProcess = spawn('node', [backendScriptPath, port]); // Pasa el puerto como argumento

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend stderr: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
  });

  // Abre las DevTools después de que la página se haya cargado
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.openDevTools();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (backendProcess) {
      backendProcess.kill();
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});