import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { Input, Button } from "@material-tailwind/react";

export function Profile() {

  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get(`/user/profile`);
      setUser({ ...response.data });
    }

    fetchUser();
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const infosForAPI = { data: { ...user } };

      await api.put(`/user`, infosForAPI);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex">
      <div>
        <h1>{user.name}</h1>
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
              value={user.userName || ''}
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Nome completo"
              name="name"
              value={user.name || ''}
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Rua"
              name="street"
              value={user.street || ''}
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
              value={user.houseNumber || ''}
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
              value={user.apartmentNumber || ''}
              type="text"
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Cidade"
              name="city"
              value={user.city || ''}
              type="text"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Bairro"
              name="neighborhood"
              value={user.neighborhood || ''}
              type="text"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Estado"
              name="state"
              value={user.state || ''}
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
              value={user.CEP || ''}
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
              value={user.email || ''}
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
              value={user.password || ''}
              onChange={handleChange}
              size="lg"
            /> */}
            <Button color="yellow" type="submit">Confirmar edição</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
