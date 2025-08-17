import { createRoot } from "react-dom/client";
import App from "./App";

// Only create root once and store it
let root: ReturnType<typeof createRoot> | null = null;

function renderApp() {
  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Root container not found");
  }

  if (!root) {
    root = createRoot(container);
  }
  
  root.render(<App />);
}

renderApp();

// Handle hot reloading in development
if (import.meta.hot) {
  import.meta.hot.accept("./App", renderApp);
}
