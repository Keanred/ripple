import { commandExit } from "./exit";
import { commandSwitch } from "./switch";
import { State } from "./state";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export const getCommands = (): Record<string, CLICommand> => {
  return {
    "/exit": {
      name: "exit",
      description: "Exits the application",
      callback: commandExit,
    },
    "/switch": {
      name: "switch",
      description: "Switch to a different room (usage: /switch <room>)",
      callback: commandSwitch,
    },
  };
};
