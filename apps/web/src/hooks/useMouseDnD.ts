import { useEffect, useRef, useState } from "react";
import { Vector2D } from "../types";
import { useMousePosition } from "./useMousePosition";
import { usePrevious } from "./usePrevious";

/**
 * when user visits the page he is given random coordinate, and he can navigate from here
 * return new window offset (? - offset is between current view and (0,0)
 */
export function useMouseDnD(): Vector2D {
  const [offset, setOffset] = useState<Vector2D>({ x: 0, y: 0 });
  const mousePosition = useMousePosition();
  const previousMousePosition = usePrevious(mousePosition);
  const isMouseDown = useRef<boolean>(false);

  useEffect(() => {
    if (!isMouseDown.current) {
      return;
    }

    if (mousePosition === undefined || previousMousePosition === undefined) {
      return;
    }

    const v = new Vector2D(mousePosition, previousMousePosition);

    setOffset((prev) => ({
      x: prev.x + v.x,
      y: prev.y + v.y,
    }));
  }, [mousePosition, previousMousePosition]);

  useEffect(() => {
    const onMouseDown = () => {
      isMouseDown.current = true;
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return offset;
}
