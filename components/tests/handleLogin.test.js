import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../LoginScreen";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

//Mock Firebase signInWithEmailAndPassword
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

//Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe("LoginScreen", () => {
  it("renders all elements correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    //Her checkes for inputfelter
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();

    //Her chekes for login button
    expect(getByText("Login")).toBeTruthy();

    //Her checkes for signup link
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  it("calls signInWithEmailAndPassword with correct credentials", async () => {
    const mockSignIn = signInWithEmailAndPassword.mockResolvedValueOnce();

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(expect.anything(), "test@example.com", "password123");
    });
  });

  it("displays an error message when login fails", async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ message: "Invalid credentials" });

    const { getByPlaceholderText, getByText, queryByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");


    fireEvent.changeText(emailInput, "wrong@example.com");
    fireEvent.changeText(passwordInput, "wrongpassword");


    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(queryByText("Invalid credentials")).toBeTruthy();
    });
  });

  it("navigates to Signup screen when signup link is pressed", () => {
    const mockNavigate = useNavigation().navigate;

    const { getByText } = render(<LoginScreen />);

    const signupLink = getByText("Don't have an account? Sign Up");

    fireEvent.press(signupLink);

    expect(mockNavigate).toHaveBeenCalledWith("Signup");
  });
});
