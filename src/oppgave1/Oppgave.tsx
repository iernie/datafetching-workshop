import { useState } from "react";
import { Todo } from "../types";
import { addTodo } from "../api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos, todoQueryKey, updateTodo } from "../api/todos";

const Oppgave1 = () => {
  const [_, setTodos] = useState<Todo[]>([]);
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
  const addTodoOptimistic = async () => {
    setTodos((prev) => [
      ...prev,
      { title: todoTitle, completed: false, id: 0 },
    ]);
    const result = await addTodo({ title: todoTitle });
    setTodos(result);
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
