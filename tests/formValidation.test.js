const { validateEmail } = require("../scripts/validation");

test("Valid email passes validation", () => {
  expect(validateEmail("test@example.com")).toBe(true);
});

test("Invalid email fails validation", () => {
  expect(validateEmail("invalid-email")).toBe(false);
});
