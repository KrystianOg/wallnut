import { FormEventHandler, useEffect, useRef } from "react";
import { useOverlay } from "../../context/OverlayContext";
import styles from "./overlay.module.css";
// import { Vector2D } from "../../types";
import { useWebSocket } from "../../hooks/useWebsocket";
import { PIN_SIZE } from "../../constants";
import { useThrottle } from "../../hooks/useThrottle";
import { usePrevious } from "../../hooks/usePrevious";

export function useQueue() {
  const queue = useRef<number[]>([]);
  const { gridOffset } = useOverlay();
  const previousGridOffset = usePrevious(gridOffset);

  useEffect(() => { }, [gridOffset]);
}

export function Overlay() {
  const { offset, gridOffset } = useOverlay();

  const connection = useWebSocket();

  const handleOffsetUpdate = () => {
    const data = JSON.stringify({
      ...offset,
      width: Math.ceil((window.innerWidth + 2 * PIN_SIZE) / PIN_SIZE),
      height: Math.ceil((window.innerHeight + 2 * PIN_SIZE) / PIN_SIZE),
    });

    connection.current?.send(data);
  };

  const throttledFn = useThrottle(handleOffsetUpdate, 300);

  useEffect(() => {
    if (connection.current?.readyState !== 1) {
      return;
    }

    throttledFn();
  }, [connection, throttledFn]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("dupa", e);
    const text: string = e.target[0].value;
    console.log("text", text);
    connection.current?.send(JSON.stringify({ note: text }));
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={onSubmit}>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
      <p>
        dimensions: <span>256x256</span>
      </p>
      <p>
        offset:{" "}
        <span>
          x: {offset.x}, y: {offset.y}
        </span>
      </p>
      <p>
        chunks:
        <span></span>
      </p>
    </div>
  );
}
