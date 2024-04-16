import { useEffect, useState } from "react";
import { Todo } from "../types";

const Oppgave2 = () => {
  const [error, setError] = useState<number>();
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * OPPGAVE 2.a
   * Endre fra en try-catch til å bruke den innebygde error-state fra valgt lib
   */
  useEffect(() => {
    const getItems = async () => {
      const result = await fetch("//localhost:3000/error");

      if (result.ok) {
        setTodos(await result.json());
        setError(undefined);
      } else {
        setError(result.status);
      }
    };
    getItems();
  }, []);

  /**
   * OPPGAVE 2.b
   * Klarer du vise forskjellige error meldinger basert på statuskoden?
   * Fetch-en retunerer 403 eller 404 randomly
   */

  /**
   * OPPGAVE 2.c
   * Endre loading-logikken til å bruke isLoading prop fra valgt lib
   */
  return (
    <>
      <h1>Todos</h1>
      {todos.length === 0 && !error && <>Loading...</>}
      {error && <h2>Noe gikk galt ved henting av data</h2>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

/**
 * OPPGAVE 2.d
 * Bonusoppgave: Kan du erstatte både error og isLoading med en suspense?
 */

export default Oppgave2;
