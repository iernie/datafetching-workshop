import { useState } from "react";
import {
  getUser,
  getUserQueryKey,
  getUsers,
  getUsersWithAge,
  getUsersWithAgeQueryKey,
  usersQueryKey,
} from "../api/users";
import useSWR, { preload } from "swr";

const Oppgave4 = () => {
  const [selectedUser, setSelectedUser] = useState<number>();

  /**
   * OPPGAVE 4.a
   * Endre til å bruke valgt lib
   */
  const { data: users = [] } = useSWR(usersQueryKey, () => getUsers());

  /**
   * OPPGAVE 4.b
   * Bruk prefrech/preload funksjon fra valgt lib på onHover til å hente inn data på forhånd
   */
  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setSelectedUser(user.id);
              }}
              onMouseOver={() => {
                preload(getUserQueryKey({ id: user.id }), () =>
                  getUser({ id: user.id })
                );
              }}
            >
              {user.name}
            </a>
          </li>
        ))}
      </ul>
      <UserInfo id={selectedUser} />
    </>
  );
};

const UserInfo = ({ id }: { id: number | undefined }) => {
  /**
   * OPPGAVE 4.c
   * Endre til å bruke valgt lib med dependent queries
   */

  const { data: userInfo, isLoading: isLoadingUserInfo } = useSWR(
    id ? getUserQueryKey({ id }) : undefined,
    () => getUser({ id: id! })
  );
  const { data: usersWithSameAge, isLoading: isLoadingAge } = useSWR(
    () =>
      userInfo ? getUsersWithAgeQueryKey({ age: userInfo.age }) : undefined,
    () => getUsersWithAge({ age: userInfo!.age })
  );

  if (!id) return null;

  /**
   * OPPGAVE 4.d
   * Bonusoppgave: Kan du bruke (pending) state til fra lib til å vise innhold underveis?
   */
  if (isLoadingUserInfo && isLoadingAge) return <>Loading...</>;

  return (
    <div>
      <h2>User info</h2>
      <div>Name: {isLoadingUserInfo ? "Loading..." : userInfo!.name}</div>
      <div>Age: {isLoadingUserInfo ? "Loading..." : userInfo!.age}</div>
      <div>
        Has job:{" "}
        {isLoadingUserInfo ? "Loading..." : userInfo!.job ? "yes" : "no"}
      </div>
      <div>
        Users with same age: {isLoadingAge ? "Loading..." : usersWithSameAge}
      </div>
    </div>
  );
};

export default Oppgave4;
