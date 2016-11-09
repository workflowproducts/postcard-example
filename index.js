const postcard = require('postcard');
const electron = require('electron');
const path = require('path');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindows = [];

app.on('ready', function () {
	postcard.init('postcard-example', function (postgresPort) {
		var curWindow = new BrowserWindow({
			'width': 1024,
			'height': 768
		});
		mainWindows.push(curWindow);

		curWindow.loadURL('file://' + path.normalize(app.getAppPath() + '/web_root/index.html'), {
			'extraHeaders': 'pragma: no-cache\n'
		});

		// Emitted when the window is closed.
		curWindow.on('closed', function() {
			mainWindows.splice(mainWindows.indexOf(curWindow), 1);
		});
	});
});

app.on('quit', function() {
	postcard.quit();
});


// Quit when all windows are closed.
app.on('window-all-closed', function () {
	app.quit();
});
