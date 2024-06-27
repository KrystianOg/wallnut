import "./App.css";
import { Wall } from "./components/wall";
import { OverlayProvider } from "./context/OverlayContext";
import { Overlay } from "./overlay/components/overlay";

function App() {
  return (
    <OverlayProvider>
      <Wall />
      <Overlay />
    </OverlayProvider>
  );
}

export default App;
