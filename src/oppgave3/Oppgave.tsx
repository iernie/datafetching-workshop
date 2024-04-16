import { getPolling, pollingQueryKey } from "../api/polling";
import useSWR from "swr";

const Oppgave3 = () => {
  /**
   * OPPGAVE 3.a
   * Endre fra useEffect og setInterval og bruk innebygget refresh/revalidate
   * i valg lib
   */
  const { data: todos = [] } = useSWR(pollingQueryKey, () => getPolling(), {
    refreshInterval: (latestData = []) => (latestData.length >= 10 ? 0 : 1000),
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
        {todos.map((todo, i) => (
          <li key={todo.id + i}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Oppgave3;
