import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react";

export function EditProduct() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [img, setImg] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      const response = await api.get(
        `/product/product-details/${params.productId}`
      );
      setProduct({ ...response.data });
    }

    fetchProduct();
  }, []);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
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
      const response = await api.put(`/product/${params.productId}`, {
        ...product,
        image: imgURL,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <h1>Editar produto</h1>
      </div>
      <div>
        <Card color="transparent" shadow={false} className="mt-7">
          <Typography variant="h4" color="blue-gray" textGradient>
            Edite seu produto para{" "}
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
                    Editar <span className="font-semibold">foto</span> do
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
                  value={product.productName}
                  required
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  label="Descrição"
                  name="description"
                  value={product.description}
                  required
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  label="Categoria"
                  name="category"
                  value={product.category}
                  list="categorias"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  label="Preço"
                  name="price"
                  value={product.price}
                  type="number"
                  required
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  label="Quantidade"
                  name="quantity"
                  value={product.quantity}
                  type="number"
                  onChange={handleChange}
                />

                <Radio
                  id="isUsed"
                  name="isUsed"
                  label="Novo"
                  value={(product.isUsed = true)}
                />
                <Radio
                  id="Used"
                  name="isUsed"
                  label="Usado"
                  value={(product.isUsed = false)}
                />
              </div>

              <Button color="green" className="mt-6" fullWidth type="submit">
                Editar produto
              </Button>
            </form>
          </div>
        </Card>
        <datalist id="categorias">
          <option value="TECHNOLOGY">Tecnologia</option>
          <option value="CLOTHES">Roupas</option>
          <option value="HOUSE">Casa</option>
        </datalist>
      </div>
    </div>
  );
}
