import LoginValidators from "./login";

test("Validate logins", () => {
  let validValues = ["bruno", "user123", "teste_usuario"];
  let invalidValues = [
    "1usuario",
    "_teste",
    "burnaosudnfouadnfobnudafoundao",
    "invalid user",
  ];

  validValues.forEach((value) => {
    expect(LoginValidators.isValid(value)).toBe(true);
  });
  invalidValues.forEach((value) => {
    expect(LoginValidators.isValid(value)).toBe(false);
  });
});
