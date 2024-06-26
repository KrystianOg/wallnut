import "./App.css";
import { VirtualizedView } from "./components/virtualized-view";
import { Wall } from "./components/wall";
import { OverlayProvider } from "./context/OverlayContext";
import { Overlay } from "./overlay/components/overlay";

function App() {
  return (
    <OverlayProvider>
      <Wall />
      <VirtualizedView />
      <Overlay />
    </OverlayProvider>
  );
}

export default App;
