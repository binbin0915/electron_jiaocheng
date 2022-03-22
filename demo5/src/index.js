const { app, BrowserWindow,dialog } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  setTimeout(() => {
    // openFile允许选择文件
    // openDirectory允许选择文件夹
    // multiSelection允许多选
    // showHiddenFiles显示隐藏文件
    // createDirectory允许创建文件夹

    dialog.showOpenDialog({
      properties:['openFile','multiSelections']
    }).then((result)=>{
      console.log(result.filePaths)
      console.log(result.canceled)
    })
    
  }, 2000);


  mainWindow.on('close',(e)=>{
    e.preventDefault()
    dialog.showMessageBox(mainWindow,{
      type:'warning',
      title:"关闭",
      message:"是否要关闭窗口？",
      buttons:["取消","残酷关闭"]
    }).then((index)=>{
      if(index.response==1){
        app.exit()
      }
    })
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
