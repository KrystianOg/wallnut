import { Pin } from "../pins/components/pin";
import { useMouseDnD } from "../hooks/useMouseDnD";
import { usePins } from "../pins/hooks/usePins";

const PIN_SIZE = 78;

export function Wall() {
  // TODO: add some loading state
  const offset = useMouseDnD();
  const [pins] = usePins();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "gray",
        left: -offset.x,
        top: -offset.y,
      }}
    >
      {!!pins.length &&
        pins.map((pin) => <Pin x={pin.x * PIN_SIZE} y={pin.y * PIN_SIZE} />)}
    </div>
  );
}
