import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        const endpoint = `http://localhost:3001/login`;

        const handleLogin = async () => {
            try {
                const payload = {
                    "email": email,
                    "password": password
                };

                const response = await fetch(`${endpoint}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    const res = await response.json();
                    localStorage.setItem("user", JSON.stringify(res.user));
                    localStorage.setItem("token", res.token);
                    console.log(res);
                    // navigate
                }

            } catch (err) {
                console.error(err);
            };

        }



        return (
            <div className='d-flex align-items-center login-form justify-content-center vh-100'>
                <div className='p-3 rounded bg-black w-25 text-white login-container'>
                    <h2 className='login-title'>Login</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                            <Form.Control
                                type="email"
                                id="inputEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter email"
                                autoComplete="email"
                                autocorrect="off"
                                autocapitalize="off"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                placeholder="Enter password"
                            />
                            <Button as={Link} to="/registration" className=" bg-dark mt-3" >Registrati</Button>

                        </Form.Group>

                        <Button type="submit" className="btn m-2 d-flex btn-primary align-items-center justify-content-center">
                            {loading ? 'Loading...' : 'Accedi'}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    };
    ;
}
export default Login;
