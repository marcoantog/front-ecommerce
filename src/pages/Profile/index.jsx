import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [reload, setReload] = useState(false);
  const [img, setImg] = useState("");

  const complete = () => toast.success("Alterações realizadas!");
  const navigate = useNavigate();

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
    try {
      e.preventDefault();
      const imgURL = await handleUpload();
      await api.put(`/user`, { ...user, image: imgURL });

      setReload(!reload);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center align space-x-20 mt-5">
      <div className="w-2/5">
        <Card className="w-full ml-8 ">
          <CardHeader floated={false} className="h-80">
            <img
              src={user.image}
              alt="profile-picture"
              className="w-full h-full"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2"
              textGradient
            >
              {user.name}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              {user.email}
            </Typography>
          </CardBody>
        </Card>
        <Link to="/orders">
          <Typography className="text-blue-400 hover:text-blue-800 mt-5">
            Minhas ordens
          </Typography>
        </Link>
      </div>
      <div className="w-3/5 pr-9">
        <form onSubmit={handleSubmit} className="mt-8 mb-2 sm:w-full">
          <div className="mb-4 flex flex-col gap-6">
            <div className="border-dashed border-2 p-3">
              <div>
                <label htmlFor="image">
                  <Typography className="font-semibold text-gray-400 mb-2">
                    Editar foto
                  </Typography>
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none hover:file:bg-gray-200 transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                  type="file"
                  id="formImg"
                  onChange={handleImage}
                />
              </div>
            </div>
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Usuário"
              id="formUser"
              name="userName"
              value={user.userName || ""}
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Nome completo"
              name="name"
              value={user.name || ""}
              required
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Rua"
              name="street"
              value={user.street || ""}
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
              value={user.houseNumber || ""}
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
              value={user.apartmentNumber || ""}
              type="text"
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Cidade"
              name="city"
              value={user.city || ""}
              type="text"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Bairro"
              name="neighborhood"
              value={user.neighborhood || ""}
              type="text"
              onChange={handleChange}
            />

            <Input
              variant="outlined"
              className=""
              size="lg"
              label="Estado"
              name="state"
              value={user.state || ""}
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
              value={user.CEP || ""}
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
              value={user.email || ""}
              onChange={handleChange}
            />
            <Input
              variant="outlined"
              className=""
              id="formPassword"
              label="Password"
              name="password"
              type="password"
              value={user.password || ""}
              onChange={handleChange}
              size="lg"
            />
            <Button color="yellow" type="submit" onClick={complete}>
              Confirmar edição
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
