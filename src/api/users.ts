import { User } from "../types";

const BASE_URL = "//localhost:3000";
export const usersQueryKey = "users";
export const getUserQueryKey = ({ id }: Pick<User, "id">) =>
  `${usersQueryKey}/${id}`;
export const getUsersWithAgeQueryKey = ({ age }: Partial<Pick<User, "age">>) =>
  `${usersQueryKey}/age/${age}`;

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/${usersQueryKey}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getUser({ id }: Pick<User, "id">): Promise<User> {
  const response = await fetch(`${BASE_URL}/${getUserQueryKey({ id })}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getUsersWithAge({
  age,
}: Pick<User, "age">): Promise<string> {
  const response = await fetch(
    `${BASE_URL}/${getUsersWithAgeQueryKey({ age })}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
