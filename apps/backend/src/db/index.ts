import { Client } from "pg";

const client = new Client();

type Note = {
  x: number;
  y: number;
  note: string;
  createdAt: Date;
};

export const query: typeof client.query = async () => {
  const res = await client.query();

  return res;
};

export async function getNotes(): Promise<Note[]> {
  const res = await client.query<Note>({
    text: "SELECT * FROM smth",
    values: [],
  });

  return res.rows;
}
