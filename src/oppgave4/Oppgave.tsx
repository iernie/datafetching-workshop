import { useEffect, useState } from "react";
import { User } from "../types";
import { getUser, getUsersWithAge } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import { getUsers, usersQueryKey } from "../api/users";

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
      <UserInfo id={selectedUser} />
    </>
  );
};

const UserInfo = ({ id }: { id: number | undefined }) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [usersWithSameAge, setUsersWithSameAge] = useState<number>();

  useEffect(() => {
    setUserInfo(undefined);
    setUsersWithSameAge(undefined);
  }, [id]);

  /**
   * OPPGAVE 4.c
   * Endre til å bruke valgt lib med dependent queries
   */
  useEffect(() => {
    if (!id) return;
    (async () => {
      const user = await getUser({ id });
      setUserInfo(user);

      const usersWithSameAge = await getUsersWithAge({ age: user.age });
      setUsersWithSameAge(+usersWithSameAge);
    })();
  }, [id]);

  if (!id) return null;

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
