import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

interface IncomingBody {
  title: string;
  description?: string;
}
export const create: RequestHandler = async (req, res) => {
  //   const newNote = new Note<NoteDocument>({
  //     title: (req.body as IncomingBody).title,
  //     description: (req.body as IncomingBody).description,
  //   });

  //   await newNote.save();
  //   res.json({ message: "Listning to create" });
  // });

  await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  }).then((note) => {
    res.json({ message: "Listning to create" });
  });
};

export const updateSingleNote: RequestHandler = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, description } = req.body as IncomingBody;

    // Validate title and description...

    const note = await Note.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note updated", note });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeSingleNote: RequestHandler = async (req, res) => {
  try {
    const { noteId } = req.params;

    const removeNote = await Note.findByIdAndDelete(noteId);

    if (!removeNote) {
      return res
        .status(404)
        .json({ error: "Note not found or already deleted" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const readAll: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  res.json({ notes });
};

export const getSinglenote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.json({ error: "Note not found" });
  res.json({ note });
};
