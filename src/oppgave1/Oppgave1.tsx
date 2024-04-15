import { useEffect, useState } from "react";
import { Todo } from "../types";

const Oppgave1 = () => {
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

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <span>{todo.completed && "✓"}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Oppgave1;
