import { createContext, useContext, useEffect, useState } from "react";
import OverlayLoader from "../components/shared/OverlayLoader";
import { auth } from "../firebase";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscriber;
  }, []);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function sendPasswordResetEmail(email) {
    return auth.sendPasswordResetEmail(email, {
      url: process.env.REACT_APP_PASSWORD_RESET_RETURN_URL,
    });
  }

  function updateEmail(newEmail) {
    return currentUser.updateEmail(newEmail);
  }

  function updatePassword(newPassword) {
    return currentUser.updatePassword(newPassword);
  }

  function signout() {
    return auth.signOut();
  }

  function deleteProfile() {
    return currentUser.delete();
  }

  const value = {
    currentUser,
    signup,
    signin,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    signout,
    deleteProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && <OverlayLoader status="Loading user" />}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider as default, useAuth };
