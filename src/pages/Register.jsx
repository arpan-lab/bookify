// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⛔ Redirect if already logged in
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase.isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔁 Use the method that already exists in firebase.jsx
      await firebase.signupUserWithEmailAndPassword(email, password);
      alert("Registered successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">Register</Button>
      </Form>
      <div className="mt-3">
        <span>Already have an account? </span>
        <Link to="/login">Login here</Link>
      </div>
    </Container>
  );
};

export default RegisterPage;
