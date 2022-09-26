import { Router } from "express";
import httpCodes from "../util/HttpCodes";
import { app } from "../app";

/*
    Routes import
 */
import userRoute from "./user";
import authRoute from "./auth";
import registerRoute from "./register";
import auth from "../middlewares/authentication";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    success: true,
    time: new Date(),
  });
});
router.use("/register", registerRoute);
router.use("/auth", authRoute); // Auth route
router.use(auth); // Auth middleware
router.use("/user", userRoute); // Users route

export default router;
