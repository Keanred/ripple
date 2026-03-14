import { WebSocket } from "ws";
import config from "../config";
import readline from "readline";

const ws = new WebSocket(`ws://localhost:${config.port}`);

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Enter message: ",
});
export const startREPL = () => {
  console.log("Starting REPL...");
  ws.on("open", () => {
    console.log("Connected to server");
    readlineInterface.prompt();
    readlineInterface.on("line", async (input) => {
      if (input.length === 0) {
        readlineInterface.prompt();
        return;
      }
      ws.send(input);
      readlineInterface.prompt();
    });
  });


  ws.on("message", (message) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Received: ${message.toString()}\n`);
    readlineInterface.prompt();
  });

  ws.on("close", () => {
    console.log("Disconnected from server");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
};

startREPL();


