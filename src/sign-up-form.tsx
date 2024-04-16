import { useCallback, useState } from "react";
import "./sign-up-form.css";

interface SignupFields {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const [formData, setFormData] = useState<SignupFields>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateEmail = useCallback((email: string): boolean => {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidation.test(email);
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      password
    );
    return hasUpperCase && hasNumber && hasSpecialCharacters;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: keyof SignupFields) => {
      setFormData((currentFormData) => ({
        ...currentFormData,
        [field]: e.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");

      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match!");
      } else if (
        formData.password === formData.confirmPassword &&
        validatePassword(formData.password) &&
        validateEmail(formData.username)
      ) {
        setSuccessMessage("sign up successful message!");
      } else if (
        formData.password === formData.confirmPassword &&
        validateEmail(formData.username)
      ) {
        setErrorMessage(
          "Password must contain at least one uppercase letter, one numeric character, and one special character!"
        );
      } else {
        setErrorMessage("Username must be a valid email address!");
      }
    },
    [formData, validatePassword]
  );

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <input
        className="form-field"
        name="username"
        value={formData.username}
        onChange={(e) => handleChange(e, "username")}
        placeholder="Username"
      />
      <input
        className="form-field"
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e, "password")}
        placeholder="Password"
      />
      <input
        className="form-field"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => handleChange(e, "confirmPassword")}
        placeholder="Confirm Password"
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="submit-button" type="submit">
        Sign Up
      </button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default SignUpForm;
