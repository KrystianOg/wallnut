import { FormEventHandler, useEffect } from "react";
import { useOverlay } from "../../context/OverlayContext";
import styles from "./overlay.module.css";
import { useWebSocket } from "../../hooks/useWebsocket";
import { PIN_SIZE } from "../../constants";
import { useThrottle } from "../../hooks/useThrottle";

export function Overlay() {
  const { offset } = useOverlay();
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
    // @ts-expect-error NOTE: it turns out target exists and is not typed, don't have time to deal with it now
    const text: string = e.target[0].value;
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
