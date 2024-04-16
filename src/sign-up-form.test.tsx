import { fireEvent, screen, render } from "@testing-library/react";
import SignUpForm from "./sign-up-form";

test("can submit the form with entered data", () => {
  const screen = render(<SignUpForm />);
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const confirmPassword = screen.getByPlaceholderText("Confirm Password");
  const submit = screen.getByText("Sign Up");

  fireEvent.change(username, { target: { value: "testuser@example.com" } });
  fireEvent.change(password, { target: { value: "Pass1234!" } });
  fireEvent.change(confirmPassword, { target: { value: "Pass1234!" } });
  fireEvent.click(submit);

  expect(screen.queryByText("sign up successful message!")).toBeInTheDocument();
});

test("can display email error message when there's invalid username", () => {
  const screen = render(<SignUpForm />);
  const username = screen.getByPlaceholderText("Username");
  const submit = screen.getByText("Sign Up");

  fireEvent.change(username, { target: { value: "randometext" } });
  fireEvent.click(submit);

  expect(
    screen.queryByText(/Username must be a valid email address!/)
  ).toBeInTheDocument();
});

test("can display password error message when passwords do not match", () => {
  const screen = render(<SignUpForm />);
  const password = screen.getByPlaceholderText("Password");
  const confirmPassword = screen.getByPlaceholderText("Confirm Password");
  const submit = screen.getByText("Sign Up");

  fireEvent.change(password, { target: { value: "Test1234!" } });
  fireEvent.change(confirmPassword, {
    target: { value: "Test12345239478!" },
  });
  fireEvent.click(submit);

  expect(screen.queryByText(/Passwords do not match!/)).toBeInTheDocument();
});

test("can display password error message when password do not match the standard", () => {
  const screen = render(<SignUpForm />);
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const confirmPassword = screen.getByPlaceholderText("Confirm Password");
  const submit = screen.getByText("Sign Up");

  fireEvent.change(username, { target: { value: "test@example.com" } });
  fireEvent.change(password, { target: { value: "1234567" } });
  fireEvent.change(confirmPassword, { target: { value: "1234567" } });
  fireEvent.click(submit);

  expect(
    screen.queryByText(
      /Password must contain at least one uppercase letter, one numeric character, and one special character!/
    )
  ).toBeInTheDocument();
});

test("can display success message when inputs are correct", () => {
  const screen = render(<SignUpForm />);
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const confirmPassword = screen.getByPlaceholderText("Confirm Password");
  const submit = screen.getByText("Sign Up");

  fireEvent.change(username, { target: { value: "test@example.com" } });
  fireEvent.change(password, { target: { value: "Pass1234!" } });
  fireEvent.change(confirmPassword, {
    target: { value: "Pass1234!" },
  });
  fireEvent.click(submit);

  expect(screen.queryByText("sign up successful message!")).toBeInTheDocument();
});
