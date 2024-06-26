import { createContext, useContext, useState } from "react";
import { Vector2D } from "../types";

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

export const useOverlay = () => useContext(OverlayContext);
