import { useMemo } from "react";
import { useOverlay } from "../../context/OverlayContext";
import styles from "./overlay.module.css";
import { Vector2D } from "../../types";

export function Overlay() {
  const { offset } = useOverlay();

  const chunks = useMemo<Vector2D>(() => {
    return new Vector2D(Math.trunc(offset.x / 78), Math.trunc(offset.y / 78));
  }, [offset]);
  return (
    <div className={styles.overlay}>
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
        <span>
          x: {chunks.x}, y: {chunks.y}
        </span>
      </p>
    </div>
  );
}
