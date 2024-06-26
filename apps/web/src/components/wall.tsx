import { useCallback } from "react";
import { Pin } from "../pins/components/pin";
import { useMouseDnD } from "../hooks/useMouseDnD";
import { usePins } from "../pins/hooks/usePins";
import { useOverlay } from "../context/OverlayContext";
import { Vector2D } from "../types";

const PIN_SIZE = 78;

export function Wall() {
  // TODO: add some loading state
  const { offset, setOffset } = useOverlay();

  const handleMouseMove = useCallback(
    (v: Vector2D) => {
      setOffset((prev) => ({ x: prev.x + v.x, y: prev.y + v.y }));
    },
    [setOffset],
  );

  useMouseDnD(handleMouseMove);
  const [pins] = usePins();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "gray",
        left: -offset.x,
        top: -offset.y,
      }}
    >
      {pins?.map((pin, i) => (
        <Pin
          key={i}
          x={pin.x * PIN_SIZE}
          y={pin.y * PIN_SIZE}
          color={pin.color}
        />
      ))}
    </div>
  );
}
