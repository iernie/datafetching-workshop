import { useState } from "react";
import {
  addTodo,
  deleteTodo,
  getTodos,
  todoQueryKey,
  updateTodo,
} from "../api/todos";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const Oppgave1 = () => {
  const [todoTitle, setTodoTitle] = useState("");

  // OPPGAVE 1.a
  /**
   * Endre fra å bruke useEffect til å bruke hook-en fra valgt lib
   */
  const { data: todos = [], mutate } = useSWR(todoQueryKey, () => getTodos());

  // OPPGAVE 1.b
  /**
   * Endre onChange til å bruke mutation og oppdater staten med oppdatert liste
   */
  const { trigger: triggerChecked } = useSWRMutation(
    todoQueryKey,
    (_, { arg }: { arg: { id: number; checked: boolean } }) =>
      updateTodo({ id: arg.id, completed: arg.checked })
  );
  const onChange = async (id: number, checked: boolean) => {
    await triggerChecked({ id, checked });
  };

  // OPPGAVE 1.c
  /**
   * Endre deleteTodo til å bruke mutation og oppdater staten med oppdatert liste
   */
  const deleteTodoItem = async (id: number) => {
    await deleteTodo({ id });
    mutate();
  };

  // OPPGAVE 1.d
  /**
   * Endre addTodoOptimistic til å bruke mutation med optimistic ui
   */
  const { trigger: triggerAdd } = useSWRMutation(
    todoQueryKey,
    (_, { arg }: { arg: string }) => addTodo({ title: arg }),
    {
      optimisticData: (current = []) => [
        ...current,
        {
          title: "loading",
          completed: false,
          id: 0,
        },
      ],
      onSuccess: () => {
        setTodoTitle("");
      },
    }
  );
  const addTodoOptimistic = async () => {
    await triggerAdd(todoTitle);
  };

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              checked={todo.completed}
              onChange={(e) => onChange(todo.id, e.target.checked)}
              type="checkbox"
            />
            {todo.title}
            <span>
              <button onClick={() => deleteTodoItem(todo.id)}>X</button>
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
