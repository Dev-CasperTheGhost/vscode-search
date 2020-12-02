import * as vscode from "vscode";
import tlds from "./tlds";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "vscode-search.search",
    async () => {
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
        const tld = tlds.find((t) => search.includes(t));
        if (tld) {
          url = `https://${search}`;
        } else {
          url = `https://duckduckgo/${search}`;
        }
      }

      vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
    }
  );

  context.subscriptions.push(disposable);
}
