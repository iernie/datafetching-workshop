import { useEffect, useState } from "react";
import { Todo } from "../types";

const Oppgave1 = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState("");

  // OPPGAVE 1.a
  /**
   * Endre fra å bruke useEffect til å bruke hook-en fra valgt lib
   */
  useEffect(() => {
    const getTodos = async () => {
      const result = await fetch("//localhost:3000/todos").then((res) =>
        res.json()
      );
      setTodos(result);
    };
    getTodos();
  }, []);

  // OPPGAVE 1.b
  /**
   * Endre onChange til å bruke mutation og oppdater staten med oppdatert liste
   */
  const onChange = async (id: number, checked: boolean) => {
    const result = await fetch("//localhost:3000/todos/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: checked,
      }),
    }).then((res) => res.json());
    setTodos(result);
  };

  // OPPGAVE 1.c
  /**
   * Endre deleteTodo til å bruke mutation og oppdater staten med oppdatert liste
   */
  const deleteTodo = async (id: number) => {
    await fetch("//localhost:3000/todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await fetch("//localhost:3000/todos").then((res) =>
      res.json()
    );
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
    const result = await fetch("//localhost:3000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todoTitle,
      }),
    }).then((res) => res.json());
    setTodos(result);
    setTodoTitle("");
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
              <button onClick={() => deleteTodo(todo.id)}>X</button>
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
