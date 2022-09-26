import { Router } from "express";
import { userController } from "../controllers/index";
import User from "../models/User";
import httpCodes from "../util/HttpCodes";
import hasChanges from "../util/compareNewProperties";

const router = Router();

router.get("/", (req, res) => {
  // List users
  console.log(res.locals.user);

  userController.getAll().then((userList) => {
    let userDataList = [];
    for (let i = 0; i < userList.length; i++) {
      userDataList.push(userList[i].getData());
    }

    res.json(userDataList);
  });
});
router.get("/:login", (req, res) => {
  // Get user by id
  let username: string = req.params.login?.trim();

  if (!username) {
    return res.status(httpCodes.BAD_REQUEST).json({
      error: "Invalid username",
    });
  }

  let query = userController.getByLogin(username);

  query.then((user) => {
    if (!user)
      return res.status(httpCodes.NOT_FOUND).json({
        error: "User not found",
      });

    res.json(user.getData());
  });
});
router.post("/", async (req, res) => {
  // Create new user
  if (req.body.id) req.body.id = undefined;

  let user = new User(
    {
      ...req.body,
    },
    userController
  );

  if (!user.isValid())
    return res.status(httpCodes.BAD_REQUEST).json({
      error: "Invalid user",
    });

  userController.getByLogin(user.getData().login).then((userWithUsername) => {
    if (userWithUsername)
      return res.status(httpCodes.BAD_REQUEST).json({
        error: "Username already exists",
      });

    let userData = user.getData();

    if (userData.email) {
      userController.getByEmail(userData.email).then((userWithEmail) => {
        if (userWithEmail)
          return res.status(httpCodes.BAD_REQUEST).json({
            error: "Email already used",
          });

        user.create().then((createdUser) => {
          return res
            .status(httpCodes.RESOURCE_CREATED)
            .json(createdUser.getData());
        });
      });
    } else
      user.create().then((createdUser) => {
        return res
          .status(httpCodes.RESOURCE_CREATED)
          .json(createdUser.getData());
      });
  });
});
router.put("/:login", (req, res) => {
  // Update one user by id
  let username = req.params.login?.trim();

  if (!username)
    return res.status(httpCodes.BAD_REQUEST).json({
      error: "Invalid username",
    });

  userController.getByLogin(username).then((user) => {
    if (!user)
      return res.status(httpCodes.NOT_FOUND).json({
        error: "User not found",
      });

    if (!hasChanges(user.getData(true), req.body))
      // Verify changes
      return res.status(httpCodes.BAD_REQUEST).json({
        error: "No changes",
      });

    user.setData({
      ...req.body,
    });

    if (!user.isValid())
      return res.status(httpCodes.BAD_REQUEST).json({
        error: "New data is invalid",
      });

    user.save().then((savedUser) => {
      return res.json(savedUser.getData(true));
    });
  });
});
router.delete("/:login", (req, res) => {
  // Delete one user by id
  let username = req.params.login?.trim();

  if (!username)
    return res.status(httpCodes.BAD_REQUEST).json({
      error: "Invalid username",
    });

  userController.getByLogin(username).then((user) => {
    if (!user)
      return res.status(httpCodes.NOT_FOUND).json({
        error: "User not found",
      });

    user.delete().then((deletedUser) => {
      return res.json(deletedUser.getData());
    });
  });
});

router.use("/:login/phone", (req, res) => {
  let username: string = req.params.login?.trim();

  if (!username)
    return res.status(httpCodes.BAD_REQUEST).json({
      error: "Invalid username",
    });

  userController.getByLogin(username).then((user) => {
    return res.json(user.getData());
  });
});

export default router;
