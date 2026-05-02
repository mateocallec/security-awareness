import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply persisted theme before React mounts to avoid flash
(() => {
  try {
    const t = localStorage.getItem("sa_theme");
    if (t === "dark") document.documentElement.classList.add("dark");
  } catch {}
})();

createRoot(document.getElementById("root")!).render(<App />);
