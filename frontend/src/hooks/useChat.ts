import { useEffect, useRef, useState } from "react";
import type { ClientPacket, ServerPacket } from "../types/packetTypes";

export const useChat = () => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ServerPacket[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => setConnected(true);

    ws.current.onmessage = (event) => {
      const packet = JSON.parse(event.data) as ServerPacket;
      setMessages((prev) => [...prev, packet]);
    };

    ws.current.onclose = () => setConnected(false);

    return () => ws.current?.close();
  }, []);

  const send = (packet: ClientPacket) => {
    ws.current?.send(JSON.stringify(packet));
  };

  const clearMessages = () => setMessages([]);

  return { messages, connected, send, clearMessages };
};
