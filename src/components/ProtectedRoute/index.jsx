import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const parsedUser = JSON.parse(loggedInUser || '""');

  // useEffect(() => {
  //   console.log(parsedUser);
  //   if (!parsedUser.token) {
  //     console.log("negado")
  //     navigate("/login");
  //   }
  // }, []);

  if(parsedUser.token){
    return <Component />
  } else{
    console.log("negado")
    return <Navigate to="/login" />
  }

  return <Component />;
}
