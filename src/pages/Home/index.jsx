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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

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
      <Link to="/category-products/CLOTHES">
        <div className="grid justify-items-end mr-7 mt-10 font-bold text-2xl text-gray-400 ">
          Roupas
        </div>
      </Link>

      <div className="flex mx-auto bg-gray-200 rounded-xl p-8 shadow-lg">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={3}
          className="w-full h-full"
        >
          {products.map((currentProduct) => {
            if (currentProduct.category === "CLOTHES") {
              return (
                <Card
                  className="max-w-[18rem] max-h-[20rem] overflow-hidden"
                  key={currentProduct._id}
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none flex justify-center"
                  >
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="h-28 pt-2"
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
                    <Link to={`/product-details/${currentProduct._id}`}>
                      {" "}
                      <Typography className="font-normal text-blue-400 hover:underline hover:text-blue-800">
                        Saiba mais!
                      </Typography>
                    </Link>
                  </CardFooter>
                </Card>
              );
            }
          })}
        </Slider>
      </div>

      <Link to="/category-products/TECHNOLOGY">
        {" "}
        <div className="grid justify-items-end mr-7 mt-10 font-bold text-2xl text-gray-400 ">
          Tecnologia
        </div>
      </Link>
      <div className="flex mx-auto bg-gray-200 rounded-xl p-8 shadow-lg ">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={3}
          className="w-full h-full"
        >
          {products.map((currentProduct) => {
            if (currentProduct.category === "TECHNOLOGY") {
              return (
                <Card
                  className="max-w-[18rem] max-h-[20rem] overflow-hidden"
                  key={currentProduct._id}
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none flex justify-center"
                  >
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="h-28 pt-2"
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
                    <Link to={`/product-details/${currentProduct._id}`}>
                      {" "}
                      <Typography className="font-normal text-blue-400 hover:underline hover:text-blue-800">
                        Saiba mais!
                      </Typography>
                    </Link>
                  </CardFooter>
                </Card>
              );
            }
          })}
        </Slider>
      </div>

      <Link to="/category-products/HOUSE">
        {" "}
        <div className="grid justify-items-end mr-7 mt-10 font-bold text-2xl text-gray-400 ">
          Casa
        </div>
      </Link>
      <div className="flex mx-auto bg-gray-200 rounded-xl p-8">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={3}
          className="w-full h-full"
        >
          {products.map((currentProduct) => {
            if (currentProduct.category === "HOUSE") {
              return (
                <Card
                  className="max-w-[18rem] max-h-[20rem] overflow-hidden"
                  key={currentProduct._id}
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none flex justify-center"
                  >
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="h-28 pt-2"
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
                    <Link to={`/product-details/${currentProduct._id}`}>
                      {" "}
                      <Typography className="font-normal text-blue-400 hover:underline hover:text-blue-800">
                        Saiba mais!
                      </Typography>
                    </Link>
                  </CardFooter>
                </Card>
              );
            }
          })}
        </Slider>
      </div>
    </div>
  );
}
