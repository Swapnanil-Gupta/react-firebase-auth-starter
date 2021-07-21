import { useAuth } from "../../contexts/auth-context";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navigationbar() {
  const { currentUser, signout } = useAuth();

  async function signOutHandler() {
    try {
      await signout();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Firebase Auth
        </Navbar.Brand>
        {currentUser && (
          <Nav>
            <NavDropdown title={<FaUser />}>
              <NavDropdown.Item as={Link} to="/update-profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={signOutHandler}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
