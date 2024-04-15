import { Outlet } from "react-router-dom";

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
      <Outlet />
    </>
  );
};

export default App;
