import express from "express";
import classes from "./class";

const router = express.Router();

router.use("/classes", classes);

export default router;
