import { useSuspenseQuery } from "@tanstack/react-query";
import { errorQueryKey, getError } from "../api/errors";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Oppgave2 = () => {
  /**
   * OPPGAVE 2.c
   * Bonusoppgave: Kan du erstatte både error og isLoading med en suspense?
   */
  return (
    <>
      <h1>Todos</h1>
      <ErrorBoundary fallback={<h2>Noe gikk galt ved henting av data</h2>}>
        <Suspense fallback={<>Loading...</>}>
          <TodoListe />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

function TodoListe() {
  const { data: todos } = useSuspenseQuery({
    queryKey: [errorQueryKey],
    queryFn: getError,
  });

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default Oppgave2;
