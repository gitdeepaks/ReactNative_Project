import express from "express";
// create a server

const app = express();

app.get("/", (res, req) => {
  req.send("<h1>Hello world!!</h1>");
});

// listen some port

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
