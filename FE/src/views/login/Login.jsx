import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Consider a more secure storage solution
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed'); // Handle non-2xx response codes
            }

            // Handle successful login (e.g., redirect to dashboard)

        } catch (err) {
            setError(err.message || 'An error occurred'); // Set error message
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-center vh-100'>
            <div className='p-3 rounded bg-black w-25 text-white'>
                <h2>Login</h2>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Label htmlFor="inputEmail">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    // Add basic validation on email format
                    />
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="btn m-2 d-flex btn-primary align-items-center justify-content-center">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
