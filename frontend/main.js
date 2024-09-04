const { app, BrowserWindow } = require("electron");
const path = require("path");
const { format } = require("url");

function createWindow() {
  const startURL = url.format({
    pathname: path.join(__dirname, "./discorde/build/index.html"),
    protocol: "file:",
    slashes: true,
  });

  console.log("Starting URL:", startURL);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Ensure this file exists or remove if not using preload
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(startURL).catch((err) => {
    console.error("Failed to load URL:", err);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
