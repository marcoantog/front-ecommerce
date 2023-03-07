import { useState, useContext } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-96 mt-32">
          <CardHeader
            variant="gradient"
            color="deep-purple"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Login
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Email"
                size="lg"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                size="lg"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                color="deep-purple"
                fullWidth
                type="submit"
              >
                Entrar!
              </Button>

              <Typography variant="small" className="mt-6 flex justify-center">
                Não tem uma conta?
              </Typography>
              <Link to="/signup">
                <Typography
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Cadastre-se
                </Typography>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
