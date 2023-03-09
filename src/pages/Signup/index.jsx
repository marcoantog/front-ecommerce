import { useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    CEP: "",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    apartmentNumber: "",
    neighborhood: "",
  });

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/uploadImage", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      await api.post("/user/signup", { ...form, image: imgURL });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card color="transparent" shadow={false} className="mt-7">
        <Typography variant="h4" color="blue-gray">
          Cadastro
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Para criar sua conta precisamos de alguns dados.
        </Typography>
        <div className="flex justify-center">
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <div className="flex items-center justify-center w-full">
                {/* aqui começa o input da imagem --------------------------------------------------- */}
                <label
                  htmlFor="formImg"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Clique para incluir</span>{" "}
                      a sua imagem.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input
                    type="file"
                    className="file:hidden text-sm w-48"
                    size="lg"
                    id="formImg"
                    onChange={handleImage}
                  />
                </label>
              </div>

              {/* aqui termina o input da imagem --------------------------------------------------- */}

              <Input
                size="lg"
                label="Usuário"
                id="formUser"
                name="userName"
                value={form.userName}
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Nome completo"
                name="name"
                value={form.name}
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Rua"
                name="street"
                value={form.street}
                type="text"
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Número"
                name="houseNumber"
                value={form.houseNumber}
                type="number"
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Complemento"
                name="apartmentNumber"
                value={form.apartmentNumber}
                type="text"
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Cidade"
                name="city"
                value={form.city}
                type="text"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="Bairro"
                name="neighborhood"
                value={form.neighborhood}
                type="text"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="Estado"
                name="state"
                value={form.state}
                type="text"
                maxLength="2"
                list="estados"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="CEP"
                name="CEP"
                value={form.CEP}
                type="text"
                required
                maxLength="9"
                onChange={handleChange}
              />

              <Input
                size="lg"
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <Input
                id="formPassword"
                label="Password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                size="lg"
              />
              <Input
                size="lg"
                label="Confirm Password"
                id="formConfirmPassword"
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Login
              </Link>
            </Typography>
          </form>
        </div>
      </Card>

      <datalist id="estados">
        <option value="AC">AC</option>
        <option value="AP">AP</option>
        <option value="AM">AM</option>
        <option value="BA">BA</option>
        <option value="CE">CE</option>
        <option value="DF">DF</option>
        <option value="ES">ES</option>
        <option value="GO">GO</option>
        <option value="MA">MA</option>
        <option value="MT">MT</option>
        <option value="MS">MS</option>
        <option value="MG">MG</option>
        <option value="PA">PA</option>
        <option value="PB">PB</option>
        <option value="PR">PR</option>
        <option value="PE">PE</option>
        <option value="PI">PI</option>
        <option value="RJ">RJ</option>
        <option value="RN">RN</option>
        <option value="RS">RS</option>
        <option value="RO">RO</option>
        <option value="RR">RR</option>
        <option value="SC">SC</option>
        <option value="SP">SP</option>
        <option value="SE">SE</option>
        <option value="TO">TO</option>
      </datalist>
    </>
  );
}
