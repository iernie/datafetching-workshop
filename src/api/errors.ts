import { Todo } from "../types";

const BASE_URL = "//localhost:3000";
export const errorQueryKey = "error";

export async function getError(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/${errorQueryKey}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
