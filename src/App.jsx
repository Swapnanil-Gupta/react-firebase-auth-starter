import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthContextProvider from "./contexts/auth-context";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navigationbar from "./components/shared/Navigationbar";
import UpdateProfile from "./components/auth/UpdateProfile";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer
        position="bottom-center"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar
      />
      <BrowserRouter>
        <Navigationbar />
        <Container className="py-4">
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="*">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
