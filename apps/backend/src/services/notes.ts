import { query } from "../db";
import type { Note } from "./notes.schema";

export const get = async ({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  height: number;
  width: number;
}): Promise<Note[]> => {
  const res = await query<Note>({
    text: "SELECT x,y,note,createdAt from notes where x BETWEEN $1 AND $2 AND y BETWEEN $3 and $4",
    values: [x, x + width, y, y + height],
  });

  return res.rows;
};

export const create = async ({
  x,
  y,
  note,
}: Omit<Note, "createdAt">): Promise<Note> => {
  const res = await query<Note>({
    text: `INSERT INTO notes (x,y,note) VALUES (
      $1,
      $2,
      $3
    ) RETURNING x,y,note, createdAt`,
    values: [x, y, note],
  });

  return res.rows[0];
};
