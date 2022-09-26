import { Router } from "express";
import httpCodes from "../util/HttpCodes";
import { app } from "../app";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    success: true,
    time: new Date(),
  });
});

export default router;
