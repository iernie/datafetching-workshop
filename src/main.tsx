import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Oppgave1 from "./oppgave1/Oppgave.tsx";
import Oppgave2 from "./oppgave2/Oppgave.tsx";
import Oppgave3 from "./oppgave3/Oppgave.tsx";
import Oppgave4 from "./oppgave4/Oppgave.tsx";
import Oppgave5 from "./oppgave5/Oppgave.tsx";
import Oppgave6 from "./oppgave6/Oppgave.tsx";

const Root = () => {
  return (
    <>
      <div className="links">
        <Link to="/oppgave/1">Oppgave 1</Link>
        <Link to="/oppgave/2">Oppgave 2</Link>
        <Link to="/oppgave/3">Oppgave 3</Link>
        <Link to="/oppgave/4">Oppgave 4</Link>
        <Link to="/oppgave/5">Oppgave 5</Link>
        <Link to="/oppgave/6">Oppgave 6</Link>
      </div>
      <h1>Datafetching workshop</h1>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
      {
        path: "5",
        element: <Oppgave5 />,
      },
      {
        path: "6",
        element: <Oppgave6 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
