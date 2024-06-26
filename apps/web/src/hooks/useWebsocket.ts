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
      if (event.data.kind === "new-note") {
        console.log(JSON.stringify(event.data.data));
      } else if (event.data.kind === "message") {
        console.log("message", event.data.data);
      } else {
        console.log("Message from server ", event.data);
      }
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
