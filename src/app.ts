import express = require("express");

import bodyParser = require("body-parser");

import todos from "./routes/todos";

const app: any = express();

app.use(bodyParser.json());

app.use(todos);

app.listen({ port: 4000 });

console.log("app is running ");
