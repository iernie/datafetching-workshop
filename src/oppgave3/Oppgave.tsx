import { useEffect, useState } from "react";
import { Todo } from "../types";
import { getPolling } from "../api/polling";

const Oppgave3 = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * OPPGAVE 3.a
   * Endre fra useEffect og setInterval og bruk innebygget refresh/revalidate
   * i valg lib
   */
  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await getPolling();
      setTodos(result);

      if (result.length >= 10) clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * OPPGAVE 3.b
   * Åpne oppgave 1 i to faner, side om side.
   * Legg til en ny todo i en fane, og se at den andre fanen oppdaterer state når den får focus.
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
