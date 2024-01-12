import express, { Request, Response } from "express";
// create a server

const app = express();

// this will parse post request coming from fetch.post()
app.use(express.json());
// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

app.post("/", (req: Request, res: Response) => {
  //  here we will add some data to the database
  console.log(req.body);
  res.json({ message: "Hello World" });
});

app.post("/create", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "Listning to create" });
});

// listen some port

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
