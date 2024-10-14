// __tests__/LoginScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen'; // Path to your LoginScreen component

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // Mock to avoid warnings

const mockedNavigate = jest.fn();
const navigation = { navigate: mockedNavigate };

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={navigation} />);
    
    // Check if the welcome and login texts are rendered
    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByText('Login to continue')).toBeTruthy();
    
    // Check if the email and password inputs are rendered
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    
    // Check if the login button is rendered
    expect(getByText('Login')).toBeTruthy();
    
    // Check if the sign-up button is rendered
    expect(getByText('New User?')).toBeTruthy();
  });

  it('displays error messages for invalid email and password', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<LoginScreen navigation={navigation} />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    // Initially, there should be no error messages
    expect(queryByText('Invalid email format')).toBeNull();
    expect(queryByText('Password must be at least 6 characters')).toBeNull();
    
    // Enter invalid email and password
    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, '123');
    
    // Press the login button
    fireEvent.press(loginButton);
    
    // Check for error messages
    expect(getByText('Invalid email format')).toBeTruthy();
    expect(getByText('Password must be at least 6 characters')).toBeTruthy();
  });

  it('does not show error messages for valid email and password', async () => {
    const { getByPlaceholderText, queryByText, getByText } = render(<LoginScreen navigation={navigation} />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    // Enter valid email and password
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    // Press the login button
    fireEvent.press(loginButton);
    
    // Error messages should not appear
    expect(queryByText('Invalid email format')).toBeNull();
    expect(queryByText('Password must be at least 6 characters')).toBeNull();
  });

  it('shows a spinner when the login button is pressed', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<LoginScreen navigation={navigation} />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    // Enter valid email and password
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    // Press the login button
    fireEvent.press(loginButton);
    
    // The spinner should appear
    await waitFor(() => getByTestId('spinner'));
  });

  it('navigates to HomeScreen on successful login', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={navigation} />);
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');
    
    // Enter valid email and password
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    // Press the login button
    fireEvent.press(loginButton);
    
    // Wait for navigation to be called
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen');
    });
  });
});
