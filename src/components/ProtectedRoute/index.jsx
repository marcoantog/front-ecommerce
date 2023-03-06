import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const parsedUser = JSON.parse(loggedInUser || '""');

  useEffect(() => {
    if (!parsedUser.token) {
      console.log("negado");
      navigate("/login");
    }
  }, []);

  return <Component />;
}
