import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <button
        className="reset"
        onClick={async () => {
          await fetch("//localhost:3000/reset");
          window.location.reload();
        }}
      >
        Reset
      </button>
      <div className="links">
        <Link to="/oppgave/1">Oppgave 1</Link>
        <Link to="/oppgave/2">Oppgave 2</Link>
        <Link to="/oppgave/3">Oppgave 3</Link>
        <Link to="/oppgave/4">Oppgave 4</Link>
      </div>
      <Outlet />
    </>
  );
};

export default App;
