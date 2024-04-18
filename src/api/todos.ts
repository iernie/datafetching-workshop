import { Todo } from "../types";

const BASE_URL = "//localhost:3000";
export const todoQueryKey = "todos";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/${todoQueryKey}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function updateTodo({
  id,
  completed,
}: Pick<Todo, "completed" | "id">): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/${todoQueryKey}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function deleteTodo({ id }: Pick<Todo, "id">): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/${todoQueryKey}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return true;
}

export async function addTodo({ title }: Pick<Todo, "title">): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/${todoQueryKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
