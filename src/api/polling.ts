import { Todo } from "../types";

const BASE_URL = "//localhost:3000";
export const pollingQueryKey = "polling";

export async function getPolling(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/${pollingQueryKey}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
