import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate =
  (schema: z.ZodObject<any, any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.safeParse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({ error: "Invalid data" });
          return;
        }
        res.status(500);
      }
    };
