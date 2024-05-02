import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const errors = {};

    if (!name || name.trim() === '') {
      errors.name = 'Il nome è richiesto';
    }

    if (!email || email.trim() === '') {
      errors.email = 'L\'indirizzo email è richiesto';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Formato email non valido';
    }

    if (!password || password.trim() === '') {
      errors.password = 'La password è richiesta';
    } else if (password.length < 8) {
      errors.password = 'La password deve essere di almeno 8 caratteri';
    }

    // if (!confirmPassword || confirmPassword.trim() === '') {
    //   errors.confirmPassword = 'La conferma della password è richiesta';
    // } else if (password !== confirmPassword) {
    //   errors.confirmPassword = 'Le password non coincidono';
    // }

    // Check if any errors exist before making the API call
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      // Implement API call to register the user (replace with your actual API endpoint)
      const response = await fetch('http://localhost:3001/authors/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error response from server
        throw new Error(errorData.message || 'Registration failed'); // Handle non-2xx response codes with specific error messages
      }
      // // Handle specific error scenarios
      // if (errorData.errorCode === 'USER_ALREADY_EXISTS') {
      //   setError({ email: 'Email già registrata' });
      // } else {
      //   setError({ general: 'Si è verificato un errore. Riprova più tardi.' });
      // }
      // Handle successful registration (e.g., display a success message or redirect to login)
      const token = await response.text(); // Assume the token is returned as plain text
      localStorage.setItem('token', token); // Store the token in local storage
      console.log('Registration successful!');
    } catch (err) {
      setError(err.message || 'An error occurred'); // Imposta lo stato di errore
    }
  }
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="p-3 rounded bg-black w-25 text-white">
        <h2>Registration</h2>
        {error && <Error error={error} />}
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputName">Nome</Form.Label>
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
          {/* <Form.Label htmlFor="confirmPassword">Conferma Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> */}
          <Button
            type="submit"
            className="btn m-2 d-flex btn-primary align-items-center justify-content-center"
          >
            Registrati
          </Button>
        </Form>
      </div>
    </div>
  );
};

const Error = ({ error }) => {
  if (!error) return null;

  return (
    <p className="text-danger">
      {error.password && <span>{error.password}</span>}
      {error.confirmPassword && <span>{error.confirmPassword}</span>}
    </p>
  );
};

export default RegistrationForm;