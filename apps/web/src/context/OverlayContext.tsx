import { createContext, useContext, useMemo, useState } from "react";
import { Vector2D } from "../types";
import { PIN_SIZE } from "../constants";

type OverlayContextProps = {
  offset: Vector2D;
  setOffset: React.Dispatch<React.SetStateAction<Vector2D>>;
};

const OverlayContext = createContext<OverlayContextProps>(undefined!);

export const OverlayProvider = ({ children }: React.PropsWithChildren) => {
  const [offset, setOffset] = useState<Vector2D>({ x: 0, y: 0 });
  return (
    <OverlayContext.Provider value={{ offset, setOffset }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const { offset, ...context } = useContext(OverlayContext);

  const gridOffset = useMemo<Vector2D>(() => {
    return new Vector2D(
      Math.floor(offset.x / PIN_SIZE),
      Math.floor(offset.y / PIN_SIZE),
    );
  }, [offset]);

  /// position on virtual grid
  const offsetVGrid = useMemo(
    () => new Vector2D(offset.x / PIN_SIZE, offset.y / PIN_SIZE),
    [offset.x, offset.y],
  );

  return {
    offset,
    gridOffset,
    offsetVGrid,
    ...context,
  };
};
