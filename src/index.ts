import express from "express";
import "./db";

import noterouter from "./routers/note";

// create a server

const app = express();

// this will parse post request coming from fetch.post()
app.use(express.json());
// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

app.use("/note", noterouter);

// 'localhost:8000/8000/note/create'

// listen some port

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
