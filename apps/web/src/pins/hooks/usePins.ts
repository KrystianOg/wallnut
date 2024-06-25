import { useEffect, useState } from "react";
import type { PinType } from "../components/pin";

const mock: PinType[] = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: 10,
    y: 11,
  },
  { x: 5, y: 10 },
];

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchPins() {
  await sleep(300);
  return mock;
}

export function usePins() {
  const [pins, setPins] = useState<PinType[]>([]);

  useEffect(() => {
    fetchPins().then((value) => setPins(value));
  }, []);

  return [pins] as const;
}
