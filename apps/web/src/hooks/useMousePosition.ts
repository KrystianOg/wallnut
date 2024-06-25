import { useEffect, useState } from "react";
import type { Point2D } from "../types";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<Point2D | undefined>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.x,
        y: e.y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return mousePosition;
}
