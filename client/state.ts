import { Interface, createInterface } from 'readline';
import { WebSocket } from 'ws';
import { CLICommand, getCommands } from './commands';
import config from './config';

export type State = {
  commands: Record<string, CLICommand>;
  readlineInterface: Interface;
  ws: WebSocket;
  username: string;
  room: string;
};

export function initState(): State {
  return {
    commands: getCommands(),
    readlineInterface: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Chat > ',
    }),
    ws: new WebSocket(`ws://${config.address}:${config.port}`),
    username: '',
    room: '',
  };
}
