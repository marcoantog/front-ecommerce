import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { Card, CardHeader, CardBody,  CardFooter, Input, Button, Tooltip, Typography } from "@material-tailwind/react";


export function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [reload, setReload] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get(`/user/profile`);
      setUser({ ...response.data });
    }

    fetchUser();
  }, [reload]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      await api.put(`/user`, user);

      setReload(!reload)

    } catch (err) {
      console.log(err);
    }
  }

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/");
  }
console.log(user)
  return (
    <div className="flex">
      <div>
      <Card className="w-96">
      <CardHeader floated={false} className="h-80">
        <img src={user.image} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
         {user.name}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          {user.email}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
        <Link to="/orders">
       <p> Minhas ordens</p>
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Usuário"
              id="formUser"
              name="userName"
              value={user.userName}
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Nome completo"
              name="name"
              value={user.name}
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Rua"
              name="street"
              value={user.street}
              type="text"
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Número"
              name="houseNumber"
              value={user.houseNumber}
              type="number"
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Complemento"
              name="apartmentNumber"
              value={user.apartmentNumber}
              type="text"
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Cidade"
              name="city"
              value={user.city}
              type="text"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Bairro"
              name="neighborhood"
              value={user.neighborhood}
              type="text"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Estado"
              name="state"
              value={user.state}
              type="text"
              maxLength="5"
              list="estados"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="CEP"
              name="CEP"
              value={user.CEP}
              type="text"
              required
              maxLength="9"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Email"
              name="email"
              type="email"
              required
              value={user.email}
              onChange={handleChange}
            />
            {/* <Input
              variant="outlined"
              className=""
              id="formPassword"
              label="Password"
              name="password"
              type="password"
              required
              value={user.password}
              onChange={handleChange}
              size="lg"
            /> */}
            <Button color="yellow" type="submit" >Confirmar edição</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
