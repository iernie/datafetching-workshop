import { useEffect, useState } from "react";
import { Todo } from "../types";

const Oppgave3 = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * OPPGAVE 3.a
   * Endre fra useEffect og setInterval og bruk innebygget refresh/revalidate
   * i valg lib
   */
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

  /**
   * OPPGAVE 3.b
   * Bonusoppgave: ???
   */

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

export default Oppgave3;
