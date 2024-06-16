import react from "react";
import reatDom from "react-dom/client";
import App from "./App";

const root = reatDom.createRoot(document.getElementById("root"));

root.render(
  <react.StrictMode>
    <App />
  </react.StrictMode>
);
