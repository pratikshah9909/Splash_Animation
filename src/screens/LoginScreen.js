import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value
  const [translateAnim] = useState(new Animated.Value(-30)); // Initial position for slide effect
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Validate inputs while typing
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    if (password && !validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  }, [email, password]);

  // Fade in and slide down effect for the welcome text
  useEffect(() => {
    console.log("Welcome to Login screen...")
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Final opacity
        duration: 1000, // Duration of fade in
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0, // Final position
        duration: 1000, // Duration for slide in
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  const handleLogin = () => {
    if (emailError || passwordError || !email || !password) {
      setEmailError(!email ? 'Please enter a valid email' : '');
      setPasswordError(!password ? 'Please enter your password' : '');
      return;
    }

    setIsLoading(true); // Start loading spinner

    // Simulate a login process delay (e.g., calling an API)
    setTimeout(() => {
      setIsLoading(false); // Stop loading spinner
      navigation.navigate('HomeScreen'); // Navigate to the HomeScreen
    }, 2000); // Simulate 2 seconds delay
  };

  return (
    <View style={styles.container}>
      {/* Top gradient */}
      <LinearGradient
        colors={['#A4C8E1', '#D6EFFF', '#FFFFFF']} // Updated gradient colors to be lighter
        style={styles.gradient}
      />

      {/* Logo */}
      <Image source={require('../images/logo.png')} style={styles.logo} />

      {/* Fade in and slide down text */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateAnim }] }}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.loginMessage}>Login to continue</Text>
      </Animated.View>

      {/* Email input */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#808080"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password input */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#808080"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => { /* Forgot Password Functionality */ }}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Spacer between input fields and buttons */}
      <View style={styles.spacer} />

      {/* Conditional rendering: Loader or Login button */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#28a745" /> // Show loader when loading
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}

      {/* Signup link */}
      <TouchableOpacity onPress={() => { /* Navigate to Signup */ }}>
        <Text style={styles.signupText}>
          New User? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set background color to white
    padding: 20,
    justifyContent: 'space-between',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 350, // Adjusted height for gradient to be longer
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    alignSelf: 'flex-start', // Align logo to top left
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'left', // Align text to the left
    color: '#000', // Black text for Welcome message
  },
  loginMessage: {
    fontSize: 18,
    color: '#666', // Darker color for the sub-message
    marginTop: 10, // Increased space between "Login to continue" and Email input
    textAlign: 'left', // Align text to the left
  },
  input: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 10,
    borderBottomWidth: 1, // Keep underline for inputs
    borderBottomColor: '#ccc',
    marginTop: 30,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#000',
    textAlign: 'right', // Align Forgot Password to the right
    marginTop: 10,
  },
  spacer: {
    flex: 1, // Takes remaining space
  },
  loginButton: {
    backgroundColor: '#28a745', // Green button color as per GIF
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10, // Slightly rounded corners for the login button
    marginBottom: 20, // Moves login button 100px from the bottom
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 100, // Moves Sign up button closer to the bottom
  },
  signupLink: {
    color: '#28a745', // Green color for Sign up link
    fontWeight: 'bold',
  },
});

export default LoginScreen;
