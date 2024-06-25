import { useLayoutEffect, useState } from "react";
import { useEventListener } from ".";
import { debounce } from "../lib";

type WindowSize<T extends number | undefined = number | undefined> = {
  width: T;
  height: T;
};

type WindowSizeOptions = {
  debounce?: number;
};

export function useWindowSize(options?: WindowSizeOptions) {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const debouncedSetWindowSize = debounce(setWindowSize, 150);

  function resize() {
    const setSize = options?.debounce ? debouncedSetWindowSize : setWindowSize;

    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEventListener("resize", resize);

  useLayoutEffect(() => {
    resize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}
