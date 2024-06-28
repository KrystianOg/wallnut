import "./App.css";
import { Github } from "./components/github";
import { Wall } from "./components/wall";
import { OverlayProvider } from "./context/OverlayContext";
import { Overlay } from "./overlay/components/overlay";

function App() {
  return (
    <OverlayProvider>
      <Wall />
      <Overlay />
      <Github />
    </OverlayProvider>
  );
}

export default App;
