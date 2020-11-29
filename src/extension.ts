import * as vscode from "vscode";

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

      const url = search?.startsWith("http")
        ? search
        : `https://duckduckgo.com/${search}`;
      vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
    }
  );

  context.subscriptions.push(disposable);
}
