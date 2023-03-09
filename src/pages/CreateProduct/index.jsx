import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";

export function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    isUsed: "",
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
      await api.post("/product", { ...form, image: imgURL });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card color="transparent" shadow={false} className="mt-7">
        <Typography variant="h4" color="blue-gray" textGradient>
          Registre seu produto para{" "}
          <span className="text-green-500">venda!</span>
        </Typography>
        <div className="flex justify-center">
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <label
                  htmlFor="formImg"
                  className="justify-start text-neutral-700 dark:text-neutral-200"
                >
                  Inserir <span className="font-semibold">foto</span> do
                  produto.
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none hover:file:bg-gray-200 transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                  type="file"
                  id="formImg"
                  onChange={handleImage}
                />
              </div>
              <Input
                size="lg"
                label="Título do produto"
                name="productName"
                value={form.productName}
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Descrição"
                name="description"
                value={form.description}
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Categoria"
                name="category"
                value={form.category}
                list="categorias"
                type="text"
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Preço"
                name="price"
                value={form.price}
                type="number"
                required
                onChange={handleChange}
              />
              <Input
                size="lg"
                label="Quantidade"
                name="quantity"
                value={form.quantity}
                type="number"
                onChange={handleChange}
              />

              <Radio
                id="isUsed"
                name="isUsed"
                label="Novo"
                value={(form.isUsed = true)}
              />
              <Radio
                id="Used"
                name="isUsed"
                label="Usado"
                value={(form.isUsed = false)}
              />
            </div>

            <Button color="green" className="mt-6" fullWidth type="submit">
              Colocar produto a venda
            </Button>
          </form>
        </div>
      </Card>
      <datalist id="categorias">
        <option value="TECHNOLOGY">Tecnologia</option>
        <option value="CLOTHES">Roupas</option>
        <option value="HOUSE">Casa</option>
      </datalist>
    </>
  );
}
