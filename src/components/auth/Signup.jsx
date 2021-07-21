import React, { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../../contexts/auth-context";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signup } = useAuth();
  const history = useHistory();

  async function formSubmitHandler(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signup(email, password);
      setLoading(false);
      history.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <Card className="w-100 m-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-4 text-center">Sign Up</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              ref={emailRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              ref={passwordRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Enter password again"
              required
              ref={confirmPasswordRef}
            />
          </Form.Group>

          <Button className="w-100" type="submit" disabled={loading}>
            {loading ? "Loading" : "Sign Up"}
          </Button>
        </Form>
      </Card.Body>

      <p className="text-center">
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </Card>
  );
}

export default Signup;
