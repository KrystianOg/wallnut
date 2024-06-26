import { useRef } from "react";

export function useThrottle<Args extends any[]>(
  fn: (...args: Args) => void,
  wait: number,
) {
  const available = useRef<boolean>(true);

  return (...args: Args): void => {
    if (!available.current) {
      return;
    }

    available.current = false;
    fn(...args);

    setTimeout(() => {
      available.current = true;
    }, wait);
  };
}
