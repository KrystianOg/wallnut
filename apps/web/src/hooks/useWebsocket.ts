import { useEffect, useRef } from "react";

type MessageEventData =
  | {
    kind: "new-note";
    data: JSON;
  }
  | {
    kind: "message";
    data: string;
  };

export function useWebSocket() {
  const connectionRef = useRef<WebSocket>();

  useEffect(() => {
    connectionRef.current = new WebSocket("ws://localhost:8000");

    const onError = (event: Event) => {
      console.log("WS Error", event.type);
    };

    const onMessage = (event: MessageEvent<MessageEventData>) => {
      // FIXME:
    };

    connectionRef.current.addEventListener("error", onError);
    // connectionRef.current.addEventListener("open", onOpen);
    connectionRef.current.addEventListener("message", onMessage);
    // connectionRef.current.addEventListener("close", onClose);

    return () => {
      connectionRef.current?.removeEventListener("error", onError);
      // connectionRef.current?.removeEventListener("open", onOpen);
      connectionRef.current?.removeEventListener("message", onMessage);
      // connectionRef.current?.removeEventListener("close", onClose);
      connectionRef.current?.close();
    };
  }, []);

  return connectionRef;
}
