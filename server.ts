import bodyParser from "body-parser";
import express from "express";
import { Todo, User } from "./src/types";
const app = express();

const initialState: Array<Todo> = [
  {
    id: 1,
    title: "Clean the bathroom",
    completed: false,
  },
  {
    id: 2,
    title: "Wash the windows",
    completed: false,
  },
  {
    id: 3,
    title: "Pet the cat",
    completed: true,
  },
];

let todos = initialState;
let counter = 0;

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/reset", (_, res) => {
  todos = initialState;
  counter = 0;
  res.sendStatus(200);
});

app.get("/todos", (_, res) => {
  res.send(todos);
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  res.send(todos.find((t) => t.id === +id));
});

app.post("/todos", (req, res) => {
  const properties = req.body as Pick<Todo, "title">;
  todos = [
    ...todos,
    {
      id: todos.reduce((acc, curr) => (curr.id > acc ? curr.id : acc), 0) + 1,
      completed: false,
      ...properties,
    },
  ];
  res.send(todos);
});

app.post("/todos/:id", (req, res) => {
  const { id } = req.params;
  const properties = req.body as Partial<Todo>;
  const index = todos.findIndex((t) => t.id === +id);
  todos = [
    ...todos.slice(0, index),
    { ...todos[index], ...properties },
    ...todos.slice(index + 1),
  ];
  res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== +id);
  res.sendStatus(200);
});

app.get("/error", (_, res) => {
  setTimeout(() => {
    res.sendStatus(Math.round(403 + Math.random()));
  }, 4000);
});

app.get("/polling", (_, res) => {
  if (counter < 10) counter += 1;
  res.send(
    Array(Math.floor(counter + 3 / 3))
      .fill(todos)
      .flatMap((a) => a)
      .slice(0, counter)
  );
});

const users: Array<User> = [
  {
    id: 420,
    name: "Per",
    job: false,
    age: 34,
  },
  {
    id: 1337,
    name: "Kari",
    job: true,
    age: 27,
  },
  {
    id: 69,
    name: "Vegard",
    job: false,
    age: 27,
  },
  {
    id: 1881,
    name: "Heidi",
    job: false,
    age: 32,
  },
  {
    id: 1,
    name: "Truls",
    job: true,
    age: 4,
  },
];

app.get("/users", (_, res) => {
  res.send(
    users.map((u) => ({
      id: u.id,
      name: u.name,
    }))
  );
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(users.find((u) => u.id === +id));
});

app.get("/users/age/:age", (req, res) => {
  const { age } = req.params;
  setTimeout(() => {
    res.send(users.filter((u) => u.age === +age).length + "");
  }, 4000);
});

app.listen(3000, () => {
  console.log("API started on port 3000");
});
