const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  // יצירת חלון הדפדפן
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // טעינת האפליקציה
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  // פתיחת כלי המפתח במצב פיתוח
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// יצירת החלון כשהאפליקציה מוכנה
app.whenReady().then(createWindow);

// סגירת האפליקציה כשכל החלונות נסגרים
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