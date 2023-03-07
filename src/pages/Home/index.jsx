import { useState, useEffect } from "react";
import { api } from "../../api/api";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";

export function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/product");

        setProducts([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="">
      <div className="container flex mx-auto bg-gray-200 rounded-xl m-10 relative">
        <Typography
          variant="h2"
          className="text-gray-50 absolute p-1"
          textGradient
        >
          ROUPAS
        </Typography>
        {products.map((currentProduct) => {
          if (currentProduct.category === "CLOTHES") {
            return (
              <Card
                className="m-8 max-w-[18rem] max-h-[20rem] overflow-hidden transition-scale duration-500 ease-in-out transform hover:scale-110 rounded-lg"
                key={currentProduct._id}
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="object-none"
                  />
                </CardHeader>
                <CardBody className="pb-1 pt-1">
                  <Typography variant="h6" color="blue-gray">
                    {currentProduct.productName}
                  </Typography>
                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-2 text-sm font-normal line-clamp-2"
                  >
                    {currentProduct.description}
                  </Typography>
                </CardBody>
                <CardFooter className="flex items-center justify-between pt-1">
                  <div className="flex items-center -space-x-3">
                    <Tooltip content={currentProduct.sellerId.name}>
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt={currentProduct.sellerId.name}
                        src={currentProduct.sellerId.image}
                        className="border-2 border-white hover:z-10"
                      />
                    </Tooltip>
                  </div>
                  <Typography className="font-normal">Saiba mais!</Typography>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>
      <div className="container flex mx-auto bg-gray-200 rounded-xl m-10 relative">
        <Typography
          variant="h2"
          className="text-gray-50 absolute p-1"
          textGradient
        >
          TECNOLOGIA
        </Typography>
        {products.map((currentProduct) => {
          if (currentProduct.category === "TECHNOLOGY") {
            return (
              <Card
                className="m-8 max-w-[18rem] max-h-[20rem] overflow-hidden transition-scale duration-500 ease-in-out transform hover:scale-110 rounded-lg"
                key={currentProduct._id}
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="object-none"
                  />
                </CardHeader>
                <CardBody className="pb-1 pt-1">
                  <Typography variant="h6" color="blue-gray">
                    {currentProduct.productName}
                  </Typography>
                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-2 text-sm font-normal line-clamp-2"
                  >
                    {currentProduct.description}
                  </Typography>
                </CardBody>
                <CardFooter className="flex items-center justify-between pt-1">
                  <div className="flex items-center -space-x-3">
                    <Tooltip content={currentProduct.sellerId.name}>
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt={currentProduct.sellerId.name}
                        src={currentProduct.sellerId.image}
                        className="border-2 border-white hover:z-10"
                      />
                    </Tooltip>
                  </div>
                  <Typography className="font-normal">Saiba mais!</Typography>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>
      <div className="container flex mx-auto bg-gray-200 rounded-xl m-10 relative">
        <Typography
          variant="h2"
          className="text-gray-50 absolute p-1"
          textGradient
        >
          CASA
        </Typography>
        {products.map((currentProduct) => {
          if (currentProduct.category === "HOUSE") {
            return (
              <Card
                className="m-8 max-w-[18rem] max-h-[20rem] overflow-hidden transition-scale duration-500 ease-in-out transform hover:scale-110 rounded-lg"
                key={currentProduct._id}
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="object-none"
                  />
                </CardHeader>
                <CardBody className="pb-1 pt-1">
                  <Typography variant="h6" color="blue-gray">
                    {currentProduct.productName}
                  </Typography>
                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-2 text-sm font-normal line-clamp-2"
                  >
                    {currentProduct.description}
                  </Typography>
                </CardBody>
                <CardFooter className="flex items-center justify-between pt-1">
                  <div className="flex items-center -space-x-3">
                    <Tooltip content={currentProduct.sellerId.name}>
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt={currentProduct.sellerId.name}
                        src={currentProduct.sellerId.image}
                        className="border-2 border-white hover:z-10"
                      />
                    </Tooltip>
                  </div>
                  <Typography className="font-normal">Saiba mais!</Typography>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}
