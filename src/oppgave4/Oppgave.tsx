import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getUser,
  getUserQueryKey,
  getUsers,
  getUsersWithAge,
  getUsersWithAgeQueryKey,
  usersQueryKey,
} from "../api/users";

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

  const { data: usersWithSameAge } = useQuery({
    queryKey: [getUsersWithAgeQueryKey({ age: userInfo?.age })],
    queryFn: () => getUsersWithAge({ age: userInfo!.age }),
    enabled: !!userInfo,
  });

  /**
   * OPPGAVE 4.d
   * Bonusoppgave: Kan du bruke (pending) state til fra lib til å vise innhold underveis?
   */
  if (!userInfo || !usersWithSameAge) return <>Loading...</>;

  return (
    <div>
      <h2>User info</h2>
      <div>Name: {userInfo.name}</div>
      <div>Age: {userInfo.age}</div>
      <div>Has job: {userInfo.job ? "yes" : "no"}</div>
      <div>Users with same age: {usersWithSameAge}</div>
    </div>
  );
};

export default Oppgave4;
