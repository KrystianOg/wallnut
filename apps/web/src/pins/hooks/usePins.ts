import { useEffect, useState } from "react";
import type { PinType } from "../components/pin";

const mock: PinType[] = [
  {
    x: 0,
    y: 0,
    color: "#642424",
  },
  {
    x: 1,
    y: 1,
    color: "#F80000",
  },
  {
    x: 10,
    y: 11,
    color: "#1C542D",
  },
  {
    x: 5,
    y: 10,
    color: "#5D9B9B",
  },
  {
    x: 4,
    y: 5,
    color: "#8673A1",
  },
  {
    x: 2,
    y: 6,
    color: "#C35831",
  },
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
