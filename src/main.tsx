import { createTheme, MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl === null) {
  throw new Error("Root element #root not found");
}

const theme = createTheme({
  cursorType: "pointer",
});

createRoot(rootEl).render(
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    <App />
  </MantineProvider>
);
