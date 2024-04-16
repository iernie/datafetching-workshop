import { useState } from "react";
import { Todo } from "../types";

const Oppgave5 = () => {
  const [error, setError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const getItems = async () => {
    try {
      const result = await fetch("//localhost:3000/error").then((res) =>
        res.json()
      );
      setTodos(result);
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <h1>Todos</h1>
      {error && <h2>Noe gikk galt ved henting av data</h2>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button type="button" onClick={getItems}>
        Get items
      </button>
    </>
  );
};

export default Oppgave5;
