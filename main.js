const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
var HID = require('node-hid');


console.log('devices:', HID.devices());

let win;

//opening the device
var device = new HID.HID(0x16C0, 0x0486);  //vid,pid

//reading the device
device.on('data', function (data) { 
    console.log(data);
})

function createWindow(){
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', ()=>{
        win=null;
    })

    
}

app.on('ready', createWindow);

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        app.quit()
    }
});

app.on('activate',()=>{
    if(win==null){
        createWindow()
    }
});

