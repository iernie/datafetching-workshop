import { useQuery } from "@tanstack/react-query";
import { getPolling, pollingQueryKey } from "../api/polling";

const Oppgave3 = () => {
  /**
   * OPPGAVE 3.a
   * Endre fra useEffect og setInterval og bruk innebygget refresh/revalidate
   * i valg lib
   */
  const { data: todos } = useQuery({
    queryKey: [pollingQueryKey],
    queryFn: getPolling,
    staleTime: 1000,
    refetchInterval: (query) =>
      (query.state.data?.length ?? 0) >= 10 ? undefined : 1000,
  });

  /**
   * OPPGAVE 3.b
   * Åpne oppgave 1 i to faner, side om side.
   * Legg til en ny todo i en fane, og se at den andre fanen oppdaterer state når den får focus.
   */

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos?.map((todo, i) => (
          <li key={todo.id + i}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Oppgave3;
