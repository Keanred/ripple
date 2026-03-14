import { State } from "./state";
import readline from "readline";
import { cleanInput } from "./inputUtils";

export function startREPL(state: State) {
  state.ws.on("open", () => {
    console.log("Connected to server");
    state.readlineInterface.prompt();
    state.readlineInterface.on("line", async (input) => {
      const userInput = cleanInput(input);
      if (userInput.length === 0) {
        state.readlineInterface.prompt();
      }
      if (userInput[0] in state.commands) {
        try {
          await state.commands[userInput[0]].callback(state, userInput[1] || "");
        } catch (error) {
          console.error(`Error executing command: ${error}`);
        }
      } else {
        const message: MessagePacket = {
          type: "message",
          content: userInput.join(" "),
        };
        state.ws.send(JSON.stringify(message));
      }
      state.readlineInterface.prompt();
    });
  });


  state.ws.on("message", (message) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Received: ${message.toString()}\n`);
    state.readlineInterface.prompt();
  });

  state.ws.on("close", () => {
    console.log("Disconnected from server");
  });

  state.ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
}
