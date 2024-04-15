import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Oppgave1 from "./oppgave1";
import Oppgave2 from "./oppgave2";
import Oppgave3 from "./oppgave3";
import Oppgave4 from "./oppgave4";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Datafetching workshop</h1>,
  },
  {
    path: "/oppgave",
    element: <App />,
    children: [
      {
        path: "1",
        element: <Oppgave1 />,
      },
      {
        path: "2",
        element: <Oppgave2 />,
      },
      {
        path: "3",
        element: <Oppgave3 />,
      },
      {
        path: "4",
        element: <Oppgave4 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
