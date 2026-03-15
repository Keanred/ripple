// src/hooks/useChat.ts
import { useEffect, useRef, useState } from "react";
import type { ClientPacket, ServerPacket, ChatPacket } from "../types/packetTypes";

export const useChat = () => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatPacket[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => setConnected(true);

    ws.current.onmessage = (event) => {
      const packet = JSON.parse(event.data) as ServerPacket;
      if (packet.type === "chat") {
        setMessages((prev) => [...prev, packet]);
      }
    };

    ws.current.onclose = () => setConnected(false);

    return () => ws.current?.close();
  }, []);

  const send = (packet: ClientPacket) => {
    ws.current?.send(JSON.stringify(packet));
  };

  return { messages, connected, send };
};
