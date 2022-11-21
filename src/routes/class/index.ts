import express, { Request, Response } from "express";

import db from "../../database";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const classes = await db.class.findMany();

  return res.json(classes);
});

export default router;

