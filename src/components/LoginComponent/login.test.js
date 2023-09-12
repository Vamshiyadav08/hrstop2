import { render, screen,act,waitFor } from '@testing-library/react';
import LoginComponent from './LoginComponent';
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';
import { toast } from "react-toastify";

test('it shows two inputs and a button', () => {
  // Render the component
  render(<LoginComponent />);

  // Find input elements by their placeholder text
  const emailInput = screen.getByPlaceholderText('Email id');
  const passwordInput = screen.getByPlaceholderText('Password');
  // Find the button element
  const signInButton = screen.getByText('Sign In');

  // Make sure the component is doing what we expect it should do
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();
});


test("Initial users should have empty string",()=>{
  render(<LoginComponent/>)
  const emailInput = screen.getByPlaceholderText('Email id');
  const passwordInput = screen.getByPlaceholderText('Password');
  expect(emailInput).toHaveValue('')
  expect(passwordInput).toHaveValue('')

})
test("should update the user when data when called handlechange",()=>{
  render(<LoginComponent/>)
  const emailInput = screen.getByPlaceholderText('Email id');
  const passwordInput = screen.getByPlaceholderText('Password');

  
  act(() => {
    // Simulate user input inside the act function
    userEvent.type(emailInput, "vs@gmail.com");
    userEvent.type(passwordInput, "vs");
  });

  // Get the updated state from the form using getByTestId
  const formElement = screen.getByTestId("login-form");
  const formData = {
    email: formElement.querySelector('input[name="email"]').value,
    password: formElement.querySelector('input[name="password"]').value,
  };

  // Check if formData has been updated correctly
  expect(formData.email).toBe("vs@gmail.com");
  expect(formData.password).toBe("vs");

})

test("should update the user data when called handlesubmit", async () => {
  render(<LoginComponent />);

  // Find input elements by their placeholder text
  const emailInput = screen.getByPlaceholderText("Email id");
  const passwordInput = screen.getByPlaceholderText("Password");
  const signInButton = screen.getByText("Sign In");

  const toastSuccessSpy = jest.spyOn(toast, 'success');
  // Simulate form submission
  userEvent.type(emailInput, "vs@gmail.com");
  userEvent.type(passwordInput, "vs");
  act(() => {
    
    
    userEvent.click(signInButton);
  });
  
  await waitFor(() => expect(toastSuccessSpy).toHaveBeenCalled());

  expect(toastSuccessSpy).toHaveBeenCalledWith('success');
  toastSuccessSpy.mockRestore();
  // Assertions after form submission
  expect(screen.queryByText("Enter valid credentials")).toBeNull(); // Error message should not be present
  
});

