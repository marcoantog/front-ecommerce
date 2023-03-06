import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get(`/user/profile`);
      console.log(response.data); 
      setUser({ ...response.data });
    }

    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={handleLogOut}>Sair</button>
    </>
  );
}
