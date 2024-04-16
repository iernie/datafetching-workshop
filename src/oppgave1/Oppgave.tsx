import { useState } from "react";
import { Todo } from "../types";
import { addTodo, deleteTodo, updateTodo } from "../api/todos";
import { useQuery } from "@tanstack/react-query";
import { getTodos, todoQueryKey } from "../api/todos";

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
  const onChange = async (id: number, checked: boolean) => {
    const result = await updateTodo({ id, completed: checked });
    setTodos(result);
  };

  // OPPGAVE 1.c
  /**
   * Endre deleteTodo til å bruke mutation og oppdater staten med oppdatert liste
   */
  const deleteTodoItem = async (id: number) => {
    await deleteTodo({ id });
    const result = await getTodos();
    setTodos(result);
  };

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
