import * as vscode from "vscode";
import tlds from "./tlds";

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("search");

  let disposable = vscode.commands.registerCommand("vscode-search.search", async () => {
    const search = await vscode.window.showInputBox({
      placeHolder: "Enter your search query",
    });

    if (!search) {
      return;
    }
    let url = "";

    if (search.startsWith("http")) {
      url = search;
    } else {
      const tld = tlds.find((t) => search.endsWith(t));
      if (tld) {
        url = `https://${search}`;
      } else {
        url = `${config.get("searchEngine")}${search}`;
      }
    }

    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
  });

  context.subscriptions.push(disposable);
}
