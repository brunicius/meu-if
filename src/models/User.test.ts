import User from "./User";

test("Test user object", () => {
  let myUser = new User({
    firstName: "Bruno",
    lastName: "Vinicius",
    email: "my meail@gmail.com",
    login: "bruno",
    password: "etst",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  expect(myUser.isValid()).toBe(false);

  let myAnotherMirroredUser = new User(myUser.getData());

  myAnotherMirroredUser.email = "mymeail@gmail.com";

  expect(myUser.isValid()).toBe(false);
});
