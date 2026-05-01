import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AmazingProvider } from "@amazing-router/react";
import "./index.css";
import { PremiumLoader } from "./components/loader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AmazingProvider loadingElement={<PremiumLoader />} />
  </StrictMode>,
);
