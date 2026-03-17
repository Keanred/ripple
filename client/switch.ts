import { State } from './state';
import type { SwitchRoomPacket } from './types/packetTypes';

export async function commandSwitch(state: State, room: string) {
  if (!room) {
    console.log('Usage: /switch <room>');
    return;
  }

  const packet: SwitchRoomPacket = {
    type: 'switch_room',
    room,
  };
  state.ws.send(JSON.stringify(packet));
  state.room = room;
  console.log(`Switched to room "${room}"`);
}
