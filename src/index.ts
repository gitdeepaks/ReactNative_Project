import express, { Request, Response } from "express";
import "./db";
import Note, { NoteDocument } from "./models/note";
import note from "./models/note";
import { title } from "process";

// create a server

const app = express();

// this will parse post request coming from fetch.post()
app.use(express.json());
// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "Hello World" });
});

interface IncomingBody {
  title: string;
  description?: string;
}

app.post("/create", async (req: Request, res: Response) => {
  //   const newNote = new Note<NoteDocument>({
  //     title: (req.body as IncomingBody).title,
  //     description: (req.body as IncomingBody).description,
  //   });

  //   await newNote.save();
  //   res.json({ message: "Listning to create" });
  // });

  await Note.create({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  }).then((note) => {
    res.json({ message: "Listning to create" });
  });
});

app.patch("/:noteId", async (req: Request, res: Response) => {
  const { noteId } = req.params;

  // const note = await Note.findById(noteId);
  // if (!note) {
  //   return res.json({ error: "Note not found" });
  // }

  const { title, description } = req.body as IncomingBody;

  // if (title) note.title = title;
  // if (description) note.description = description;

  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );

  if (!note) return res.json({ error: "Note not found" });

  await note.save();

  res.json({ note: "Note updated" });
});

// listen some port

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
