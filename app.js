const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
var Menu = require("electron").Menu;
const widevine = require("electron-widevinecdm");


// Create a new instance of the WindowStateManager
// and pass it the name and the default properties
let willQuitApp = false;
let mainWindow;
widevine.load(app);

app.on('ready', () => {
    // When creating a new BrowserWindow
    // you can assign the properties of the mainWindowState.
    // If a window with the name 'main' was saved before,
    // the saved values will now be assigned to the BrowserWindow again
    mainWindow = new BrowserWindow({
      titleBarStyle: "hidden",
      width: 1000,
      height: 700,
    });
    mainWindow.loadURL('https://kara.netlify.com');

    // You can check if the window was closed in a maximized saveState
    // If so you can maximize the BrowserWindow again
    if (mainWindow.maximized) {
      mainWindow.maximize();
    }

    // Don't forget to save the current state
    // of the Browser window when it's about to be closed
    mainWindow.on('close', (e) => {
        if (willQuitApp) {
            /* the user tried to quit the app */
            mainWindow = null;
        } else {
            /* the user only tried to close the window */
            e.preventDefault();
            if (mainWindow.isFullScreen()) {
                mainWindow.once('leave-full-screen', function () {
                    mainWindow.hide();
                })
                mainWindow.setFullScreen(false);
            } else {
                mainWindow.hide();
            }
        }
    });
    // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [{
                label: "About Application",
                selector: "orderFrontStandardAboutPanel:"
            },
            {
                type: "separator"
            },
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: function () {
                    app.quit();
                }
            }
        ]
    }, {
        label: "Edit",
        submenu: [{
                label: "Undo",
                accelerator: "CmdOrCtrl+Z",
                selector: "undo:"
            },
            {
                label: "Redo",
                accelerator: "Shift+CmdOrCtrl+Z",
                selector: "redo:"
            },
            {
                type: "separator"
            },
            {
                label: "Cut",
                accelerator: "CmdOrCtrl+X",
                selector: "cut:"
            },
            {
                label: "Copy",
                accelerator: "CmdOrCtrl+C",
                selector: "copy:"
            },
            {
                label: "Paste",
                accelerator: "CmdOrCtrl+V",
                selector: "paste:"
            },
            {
                label: "Select All",
                accelerator: "CmdOrCtrl+A",
                selector: "selectAll:"
            }
        ]
    }];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
app.on('activate', () => mainWindow.show());

app.on('before-quit', () => willQuitApp = true);
