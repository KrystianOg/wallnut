import { useEffect } from "react";
import { useOverlay } from "../context/OverlayContext";

/**
 * follow current offset and calculate new view positions
 */
export function useView() {
  const smth = new Map<string, string>();

  const { offset } = useOverlay();

  useEffect(() => { }, [offset]);

  const views = [];
}
