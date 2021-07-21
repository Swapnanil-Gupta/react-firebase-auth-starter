import React from "react";
import { useAuth } from "../../contexts/auth-context";

function Dashboard() {
  const { currentUser } = useAuth();

  return <h3>Hello {currentUser.email}</h3>;
}

export default Dashboard;
