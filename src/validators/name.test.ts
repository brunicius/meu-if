import NameValidators from "./name";

test("Validade names", () => {
  let validName = "Bruno Vinicius";
  let invalidName = "Asdm23";

  expect(NameValidators.isValid(validName)).toBe(true);
  expect(NameValidators.isValid(invalidName)).toBe(false);
});
