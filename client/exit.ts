import { State } from "./state";

export async function commandExit(state: State) {
  console.log("Exiting application...");
  state.readlineInterface.close();
  state.ws.close();
  process.exit(0);
}
