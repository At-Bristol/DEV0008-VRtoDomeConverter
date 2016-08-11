
const electron = require('electron')
// Module to control application life.
const app = electron.app
const remote = electron.remote
const dialog = electron.dialog
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const {ipcMain} = require('electron');

app.setName('VR TO DOME');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let playerWindow
let controlWindow

ipcMain.on('to-Player', (event, arg) => {
  //console.log(arg);
  playerWindow.webContents.send('from-Player', arg)
});

ipcMain.on('to_Controls', (event, arg) => {
  //console.log(arg);reci
  controlWindow.webContents.send('from-Controls', arg)
});



function createWindow () {

  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

 

  // Create the browser window.
 


   if (externalDisplay) {
       playerWindow = new BrowserWindow({ title:'VR to Dome Player', movable: false, closeable: false,  height: 1024, width: 1024, resizable: true, frame: false,  autoHideMenuBar: true, height: 1024, width: 1024, fullscreen: true, transparent:'true', defaultFontFamily: 'sanSerif'});
    controlWindow = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      title:'VR to Dome controls', 
      transparent:'true',  
      defaultFontFamily: 'sanSerif',
      alwaysOnTop: true,
      height: 800, 
      width: 600,
    })
  }else{ 
       playerWindow = new BrowserWindow({ title:'VR to Dome Player',closeable: false, height: 1024, width: 1024, fullscreen: true, frame: false,autoHideMenuBar: true, transparent:'true', defaultFontFamily: 'sanSerif'});
       controlWindow = new BrowserWindow({  height: 800, width: 600, alwaysOnTop: true,  title:'VR to Dome', transparent:'true',  defaultFontFamily: 'sanSerif'}) 
  };
  

  // and load the index.html of the app.
  playerWindow.loadURL(`file://${__dirname}/index.html`)
  controlWindow.loadURL(`file://${__dirname}/control.html`)


  // Open the DevTools.
 //playerWindow.webContents.openDevTools()
//  controlWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  playerWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    playerWindow = null
  })

    controlWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
     if(playerWindow){
       playerWindow.close();
    }
    controlWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', 




  createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (playerWindow === null) {
    playerWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.