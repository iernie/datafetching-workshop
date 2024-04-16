import { useEffect, useState } from "react";
import { Todo } from "../types";

const Oppgave3 = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const result = await fetch("//localhost:3000/todos").then((res) =>
        res.json()
      );
      setTodos(result);
    };
    getTodos();
  }, []);

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

  const deleteTodo = async (id: number) => {
    const result = await fetch("//localhost:3000/todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setTodos(result);
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
    </>
  );
};

export default Oppgave3;
