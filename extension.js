// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var exec = require('child_process').exec;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "nordvpn" is now active!');

	const groups = [
		'United State', 'United Kingdom', 'Canada', 'France', 'German',
		'Brazil', 'Vietnam', 'Sweden', 'Taiwan', 'Thailand', 'Spain', 'South Korea', 'Turkey'
	]

	let connectCommand = vscode.commands.registerCommand('nordvpn.quick_connect_vpn', function () {
		exec('nordvpn -c')
		vscode.window.showInformationMessage('Quick Connecting');
	});
	let connectGroupCommand = vscode.commands.registerCommand('nordvpn.connect_vpn_group', function () {
		vscode.window.showQuickPick(groups).then(group => {
			exec(`nordvpn -c -g "${group}"`)
			vscode.window.showInformationMessage('Connecting to best server: ' + group);
		})
	});
	let disconnectCommand = vscode.commands.registerCommand('nordvpn.disconnect_vpn', function () {
		exec('nordvpn -d')
	});

	context.subscriptions.push(connectCommand);
	context.subscriptions.push(connectGroupCommand);
	context.subscriptions.push(disconnectCommand);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
