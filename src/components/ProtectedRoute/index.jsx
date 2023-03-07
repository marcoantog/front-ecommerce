import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const parsedUser = JSON.parse(loggedInUser || '""');

  useEffect(() => {
    if (!parsedUser.token) {
      console.log("Acesso negado");
      toast.error("Por favor faça login.");
      navigate("/login");
    }
  }, []);

  return <Component />;
}
