import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // State for error message

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (password !== confirmPassword) {
      setError('Passwords must match');
      return;
    }

    try {
      // Implement API call to register the user (replace with your actual API endpoint)
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed'); // Handle non-2xx response codes
      }

      // Handle successful registration (e.g., display a success message or redirect to login)

    } catch (err) {
      setError(err.message || 'An error occurred'); // Set error message
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
      <div className='p-3 rounded bg-black w-25 text-white'>
        <h2>Registration</h2>
        {error && <p className="text-danger">{error}</p>} {/* Display error message */}
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputName">Name</Form.Label>
          <Form.Control
            type="text"
            id="inputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label htmlFor="inputEmail">Email</Form.Label>
          <Form.Control
            type="email"
            id="inputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" className="btn m-2 d-flex btn-primary align-items-center justify-content-center">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
