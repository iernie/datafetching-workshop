import { useState } from "react";
import { Todo } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  getTodos,
  todoQueryKey,
  updateTodo,
} from "../api/todos";

const Oppgave1 = () => {
  const [todoTitle, setTodoTitle] = useState("");

  // OPPGAVE 1.a
  /**
   * Endre fra å bruke useEffect til å bruke hook-en fra valgt lib
   */
  const { data: todos } = useQuery({
    queryKey: [todoQueryKey],
    queryFn: getTodos,
  });

  // OPPGAVE 1.b
  /**
   * Endre onChange til å bruke mutation og oppdater staten med oppdatert liste
   */
  const queryClient = useQueryClient();
  const { mutate: updateQuery } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [todoQueryKey] });
    },
  });

  // OPPGAVE 1.c
  /**
   * Endre deleteTodo til å bruke mutation og oppdater staten med oppdatert liste
   */
  const { mutate: deleteQuery } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [todoQueryKey] });
    },
  });

  // OPPGAVE 1.d
  /**
   * Endre addTodoOptimistic til å bruke mutation med optimistic ui
   */
  const { mutate: addQuery } = useMutation({
    mutationFn: addTodo,
    // When mutate is called:
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [todoQueryKey] });
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([todoQueryKey]);
      // Optimistically update to the new value
      queryClient.setQueryData([todoQueryKey], (old: Todo[]) => [
        ...old,
        newTodo,
      ]);
      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [todoQueryKey] });
    },
  });

  const addTodoOptimistic = async () => {
    addQuery({ title: todoTitle }, {});
    setTodoTitle("");
  };

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <input
              checked={todo.completed}
              onChange={(e) =>
                updateQuery({ id: todo.id, completed: e.target.checked })
              }
              type="checkbox"
            />
            {todo.title}
            <span>
              <button onClick={() => deleteQuery({ id: todo.id })}>X</button>
            </span>
          </li>
        ))}
      </ul>
      <form>
        <h2>Add todo item</h2>
        <div>
          <label>
            <input
              type="text"
              placeholder="Title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={addTodoOptimistic}
            disabled={todoTitle === ""}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Oppgave1;
