# Workshop - Datahenting

## Kom igang

Installer avhengigheter:

```
npm install
```

Kjør opp server og klient:

```
npm start
```

OBS. Klienten kjører ikke på port 3000. Sjekk terminalen når du kjører opp.

## Konsepter

Her finner du grunnleggende informasjon om hvordan du henter data: [tanstack](https://tanstack.com/query/latest/docs/framework/react/guides/queries#query-basics) / [swr](https://swr.vercel.app/docs/data-fetching).

### Oppdater data i servere

Hvis du ønsker å oppdatere data server-side, må du bruke bibliotekenes muteringer.

#### Tanstack

Her kan du bruke [mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

```jsx
// TODO: Verify that this works
const { mutate } = useMutation({
  mutationFn: ({ id: string }) => {
    /** Implement post-fetch */
  },
});

// Use it like this
mutate({ id: todo.id });
```

#### SWR

Her kan du bruke [useSWRMutation](https://swr.vercel.app/docs/mutation.en-US#useswrmutation)

```jsx
const { trigger } = useSWRMutation("/todos", updateTodos);

// Update function
async function updateTodos(url: string, { arg }: { arg: { id: number } }) {
  /** Implement post-fetch */
}

// Use it like this
trigger({ id: todo.id });
```

## Oppgaver

Alle oppgavene kan gjøres med det `"data-lib"` du foretrekker av `tanstack query` og `swr`. Legg til biblioteket du ønsker å bruke selv!
