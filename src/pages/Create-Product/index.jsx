import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography, Radio } from "@material-tailwind/react";

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
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card color="transparent" shadow={false} className="mt-7">
        <Typography variant="h4" color="blue-gray">
          Vender produto
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Insira os dados do produto
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type="file"
                    size="lg"
                    id="formImg"
                    onChange={handleImage}
                  />
                </label>
              </div>

              {/* aqui termina o input da imagem --------------------------------------------------- */}

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

      <Radio id="isUsed" name="isUsed" label="Novo" value={form.isUsed = true} />
      <Radio id="isUsed" name="isUsed" label="Usado" value={form.isUsed = false} />
            </div>

            <Button className="mt-6" fullWidth type="submit">
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
