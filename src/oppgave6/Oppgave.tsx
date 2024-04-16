import { useEffect, useState } from "react";
import { Todo } from "../types";

const Oppgave6 = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await fetch("//localhost:3000/polling").then((res) =>
        res.json()
      );
      setTodos(result);

      if (result.length >= 10) clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo, i) => (
          <li key={todo.id + i}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Oppgave6;
