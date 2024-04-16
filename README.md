# Workshop - Datahenting

## Kom igang

```
npm start
```

## Konsepter

Her finner dere grunnleggende informasjon om hvordan man henter data: [tanstack](https://tanstack.com/query/latest/docs/framework/react/guides/queries#query-basics) / [swr](https://swr.vercel.app/docs/data-fetching).

### Oppdater data i servere

Hvis man ønsker å oppdatere data server-side så kan man bruke ikke bruke de vanlige hooksen, uten då må man ta i bruk mutations.

#### Tanstack

Her kan man bruke [mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

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

Her kan man bruke [useSWRMutation](https://swr.vercel.app/docs/mutation.en-US#useswrmutation)

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

### Oppgave 1

Erstatt eksisterende implementasjon av en `get`-request med lib:et du valgte over.

### Oppgave 2

Erstatt eksisterende implementasjon av en `post`-request med lib:et du valgte over.

### Oppgave 3

Erstatt eksisterende implementasjon av en `delete`-request med lib:et du valgte over.

### Oppgave 4

Erstatt form post-en med en mutation med optimistic UI

### Oppgave 5

Erstatt feilhåndtering med error statate fra lib:et du valgte

### Oppgave 6

Erstatt useInterval med refresh/revalidate data fra lib:et du valgte
