import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUser,
  getUserQueryKey,
  getUsers,
  getUsersWithAge,
  getUsersWithAgeQueryKey,
  usersQueryKey,
} from "../api/users";
import { User } from "../types";

const Oppgave4 = () => {
  const [selectedUser, setSelectedUser] = useState<number>();

  /**
   * OPPGAVE 4.a
   * Endre til å bruke valgt lib
   */
  const { data: users } = useQuery({
    queryKey: [usersQueryKey],
    queryFn: getUsers,
  });

  /**
   * OPPGAVE 4.b
   * Bruk prefrech/preload funksjon fra valgt lib på onHover til å hente inn data på forhånd
   */
  const queryClient = useQueryClient();
  const prefetch = (user: User) => {
    queryClient.prefetchQuery({
      queryKey: [getUserQueryKey({ id: user.id })],
      queryFn: () => getUser({ id: user.id }),
      staleTime: 60000,
    });
    queryClient.prefetchQuery({
      queryKey: [getUsersWithAgeQueryKey({ age: user.age })],
      queryFn: () => getUsersWithAge({ age: user.age }),
      staleTime: 60000,
    });
  };

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setSelectedUser(user.id);
              }}
              onMouseEnter={() => prefetch(user)}
            >
              {user.name}
            </a>
          </li>
        ))}
      </ul>
      {selectedUser != null && <UserInfo id={selectedUser} />}
    </>
  );
};

const UserInfo = ({ id }: { id: number }) => {
  /**
   * OPPGAVE 4.c
   * Endre til å bruke valgt lib med dependent queries
   */
  const { data: userInfo } = useQuery({
    queryKey: [getUserQueryKey({ id })],
    queryFn: () => getUser({ id: id }),
  });

  console.log({ userInfo });

  const { data: usersWithSameAge, isLoading } = useQuery({
    queryKey: [getUsersWithAgeQueryKey({ age: userInfo?.age })],
    queryFn: () => getUsersWithAge({ age: userInfo!.age }),
    enabled: !!userInfo,
  });

  /**
   * OPPGAVE 4.d
   * Bonusoppgave: Kan du bruke (pending) state til fra lib til å vise innhold underveis?
   */
  if (!userInfo) return <>Loading...</>;

  return (
    <div>
      <h2>User info</h2>
      <div>Name: {userInfo.name}</div>
      <div>Age: {userInfo.age}</div>
      <div>Has job: {userInfo.job ? "yes" : "no"}</div>
      <div>
        Users with same age: {isLoading ? "Loading..." : usersWithSameAge}
      </div>
    </div>
  );
};

export default Oppgave4;
