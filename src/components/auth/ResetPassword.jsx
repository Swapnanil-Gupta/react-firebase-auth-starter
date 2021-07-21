import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../../contexts/auth-context";
import Alert from "react-bootstrap/Alert";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const emailRef = useRef();

  const { sendPasswordResetEmail } = useAuth();

  async function emailSubmitHandler(e) {
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await sendPasswordResetEmail(email);
      setSuccess("Password reset email sent");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <Card className="w-100 m-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-4 text-center">Reset Password</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={emailSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              autoFocus
              ref={emailRef}
            />
          </Form.Group>

          <Button className="w-100" type="submit" disabled={loading}>
            {loading ? "Loading" : "Reset Password"}
          </Button>
        </Form>
      </Card.Body>

      <p className="text-center">
        <Link to="/signin">Sign in</Link>
      </p>
    </Card>
  );
}

export default ResetPassword;
