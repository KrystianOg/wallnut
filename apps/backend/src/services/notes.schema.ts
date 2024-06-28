import * as z from "zod";

export const noteSchema = z.object({
  x: z.number().int().gte(-256).lte(255),
  y: z.number().int().gte(-256).lte(255),
  note: z.string().max(255),
});

export type Note = z.infer<typeof noteSchema> & {
  createdAt: Date;
};
