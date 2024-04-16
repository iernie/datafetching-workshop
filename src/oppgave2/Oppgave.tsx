import { useQuery } from "@tanstack/react-query";
import { errorQueryKey, getError } from "../api/errors";

const Oppgave2 = () => {
  /**
   * OPPGAVE 2.a
   * Endre fra en try-catch til å bruke den innebygde error-state fra valgt lib
   * Se at den prøver å laste inn på nytt i dev tools
   */
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: [errorQueryKey],
    queryFn: getError,
  });

  /**
   * OPPGAVE 2.b
   * Endre loading-logikken til å bruke isLoading prop fra valgt lib
   */
  return (
    <>
      <h1>Todos</h1>
      {isLoading && <>Loading...</>}
      {error && <h2>Noe gikk galt ved henting av data</h2>}
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

/**
 * OPPGAVE 2.c
 * Bonusoppgave: Kan du erstatte både error og isLoading med en suspense?
 */

export default Oppgave2;
