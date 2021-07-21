import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../../contexts/auth-context";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

function UpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { currentUser, updateEmail, updatePassword, deleteProfile } = useAuth();
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
      setSuccess(null);
      if (email !== currentUser.email) {
        await updateEmail(email);
      }
      if (password) {
        await updatePassword(password);
      }
      setSuccess("Updated successfully");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function deleteProfileHandler() {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await deleteProfile();
      setLoading(false);
      history.push("/signin");
      toast.success("Profile deleted");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <Card className="w-100 m-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h3 className="mb-4 text-center">Update Profile</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
              ref={emailRef}
              defaultValue={currentUser.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Leave blank to keep same"
              ref={passwordRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Leave blank to keep same"
              ref={confirmPasswordRef}
            />
          </Form.Group>

          <Button className="w-100 mb-3" type="submit" disabled={loading}>
            Update
          </Button>
        </Form>

        <Button
          variant="danger"
          className="w-100"
          disabled={loading}
          onClick={deleteProfileHandler}
        >
          Delete Profile
        </Button>
      </Card.Body>

      <p className="text-center">
        <Link to="/dashboard">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </p>
    </Card>
  );
}

export default UpdateProfile;
