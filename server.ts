import bodyParser from "body-parser";
import express from "express";
import { Todo } from "./src/types";
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
  res.send(200);
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
  res.send(todos);
});

app.listen(3000, () => {
  console.log("API started on port 3000");
});
