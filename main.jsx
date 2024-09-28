import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/**
 * User code
 */
const App = () => {
  return <div style={{ color: "red" }}>Hello world!</div>;
};

export const mount = () =>
  createRoot(document && document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

const MY_TITLE = "TEST APP";

/**
 * For controlling the HTML template
 */
export const INDEX_HTML = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${MY_TITLE}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.jsx"></script>
    <script type="module">
      import { mount } from "./main.jsx";
      mount(); // Start the app
    </script>
  </body>
</html>
`;
