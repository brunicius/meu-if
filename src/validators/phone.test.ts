import PhoneValidators from "./phone";

test("Validate phone by string", () => {
  let validPhoneStr: string = "87956545351",
    otherValidPhoneStr: string = "(87) 9 1453-7533",
    invalidPhoneStr: string = "846826 064 9";

  expect(PhoneValidators.isValidPhone(validPhoneStr)).toBe(true);
  expect(PhoneValidators.isValidPhone(otherValidPhoneStr)).toBe(true);
  expect(PhoneValidators.isValidPhone(invalidPhoneStr)).toBe(false);
});

test("Remove invalid chars from valid phone", () => {
  let validPhoneStr = "(87) 9 7689-5831",
    otherValidPhoneStr = "+55 (87) 9 5313-5930";

  expect(PhoneValidators.formatPhone(validPhoneStr)).toBe("558776895831");
  expect(PhoneValidators.formatPhone(otherValidPhoneStr)).toBe("558753135930");
});

test("convert valid phones in chatIds", () => {
  let validPhoneStr: string = "87 9 8476-2135",
    otherValidPhoneStr: string = "+55 9 4538-9453";

  expect(
    PhoneValidators.formattedPhoneToChatId(
      PhoneValidators.formatPhone(validPhoneStr)
    )
  ).toBe("558784762135@c.us");
  expect(
    PhoneValidators.formattedPhoneToChatId(
      PhoneValidators.formatPhone(otherValidPhoneStr)
    )
  ).toBe("5545389453@c.us");
});
