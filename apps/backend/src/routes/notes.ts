import express from "express";
import * as notes from "../services/notes";
import { validate } from "../middlewares/zodValidation";
import { Note, noteSchema } from "../services/notes.schema";
const router = express.Router();

router.post("/", validate(noteSchema), async (req, res) => {
  // TODO: change it to be generic
  const body = req.body as Note;
  await notes.create(body);
});

export default router;
