import { useEffect, useMemo, useState } from "react";
import { useOverlay } from "../context/OverlayContext";
import { Vector2D } from "../types";

export function VirtualizedView() {
  const { offset } = useOverlay();
  const [pins, setPins] = useState([]);

  const chunks = useMemo<Vector2D>(() => {
    return {
      x: Math.floor(offset.x / 78),
      y: Math.floor(offset.y / 78),
    };
  }, [offset]);

  useEffect(() => {
    console.log(chunks.x, chunks.y);
  }, [chunks.x, chunks.y]);

  // const visiblePins = useMemo(() => )
  return <div></div>;
}
