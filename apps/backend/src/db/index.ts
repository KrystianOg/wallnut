import { Client } from "pg";

const client = new Client();

type Note = {
  x: number;
  y: number;
  note: string;
  createdAt: Date;
};
