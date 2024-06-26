import { useEffect, useMemo } from "react";
import { useOverlay } from "../context/OverlayContext";
import { Vector2D } from "../types";
import { PIN_SIZE } from "../constants";

const CHUNK_SIZE = 8;

function VirtualizedViewScreen() {
  return <div></div>;
}

export function VirtualizedView() {
  const { offset } = useOverlay();

  const chunks = useMemo<Vector2D>(() => {
    return {
      x: Math.floor(offset.x / (PIN_SIZE * CHUNK_SIZE)) * CHUNK_SIZE,
      y: Math.floor(offset.y / (PIN_SIZE * CHUNK_SIZE)) * CHUNK_SIZE,
    };
  }, [offset]);

  return <div></div>;
}
