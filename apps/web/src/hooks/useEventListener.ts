import { RefObject, useEffect } from "react";

export function useEventListener(
  type: keyof WindowEventMap,
  handler: () => void,
  element?: RefObject<HTMLElement>,
) {
  useEffect(() => {
    const targetElement: HTMLElement | Window = element?.current ?? window;

    targetElement.addEventListener(type, handler);
    return () => {
      window.removeEventListener(type, handler);
    };
  }, [handler, type, element]);
}
