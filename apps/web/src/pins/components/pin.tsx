import type { Point2D } from "../../types";
import styles from "./pin.module.css";

export type PinType = Point2D; // & {};

export function Pin(props: PinType) {
  return (
    <div
      className={styles.pin}
      style={{
        left: props.x,
        top: props.y,
      }}
    ></div>
  );
}
