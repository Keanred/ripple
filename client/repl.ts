import readline from 'readline';
import { cleanInput } from './inputUtils';
import { State } from './state';
import type { JoinPacket, MessagePacket } from './types/packetTypes';

function promptQuestion(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

export function startREPL(state: State) {
  state.ws.on('open', async () => {
    console.log('Connected to server');

    const username = (await promptQuestion(state.readlineInterface, 'Enter username: ')).trim();
    const room = (await promptQuestion(state.readlineInterface, 'Enter room: ')).trim();

    state.username = username;
    state.room = room;

    const joinPacket: JoinPacket = {
      type: 'join',
      username: state.username,
      room: state.room,
    };
    state.ws.send(JSON.stringify(joinPacket));
    console.log(`Joined room "${state.room}" as "${state.username}"`);

    state.readlineInterface.prompt();
    state.readlineInterface.on('line', async (input) => {
      const userInput = cleanInput(input);
      if (userInput.length === 0) {
        state.readlineInterface.prompt();
        return;
      }
      const command = userInput[0].toLowerCase();
      if (command in state.commands) {
        try {
          await state.commands[command].callback(state, ...userInput.slice(1));
        } catch (error) {
          console.error(`Error executing command: ${error}`);
        }
      } else {
        const message: MessagePacket = {
          type: 'message',
          content: userInput.join(' '),
        };
        state.ws.send(JSON.stringify(message));
      }
      state.readlineInterface.prompt();
    });
  });

  state.ws.on('message', (message) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Received: ${message.toString()}\n`);
    state.readlineInterface.prompt();
  });

  state.ws.on('close', () => {
    console.log('Disconnected from server');
  });

  state.ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
}
