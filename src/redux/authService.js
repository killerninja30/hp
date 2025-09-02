// src/services/authService.js

export const login = async (email, password) => {
  // Fetch the user data from the public folder
  const response = await fetch('/users.json');
  
  const users = await response.json();
  
  // Find a user that matches the email and password
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (user) {
    // If user is found, return the user data (without the password)
    const { password, ...userData } = user;
    return Promise.resolve(userData);
  } else {
    // If user is not found, reject the promise with an error message
    return Promise.reject(new Error('Invalid email or password.'));
  }
};