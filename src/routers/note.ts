import { create } from "domain";
import { Router } from "express";
import {
  updateSingleNote,
  removeSingleNote,
  readAll,
  getSinglenote,
} from "../controllers/note";

const router = Router();

router.post("/create", create);

router.patch("/:noteId", updateSingleNote);

router.delete("/:noteId", removeSingleNote);

router.get("/", readAll);

router.get("/:id", getSinglenote);

export default router;
