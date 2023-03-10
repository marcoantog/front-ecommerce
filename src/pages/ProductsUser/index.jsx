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
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function ProductsUser() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/product/products-user");

        setProducts([...response.data]);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Meus produtos a venda</h1>

      {!load && (
        <div className="flex mx-auto bg-gray-200 rounded-xl p-8 m-10">
          <Slider
            dots={true}
            infinite={false}
            speed={500}
            slidesToShow={3}
            slidesToScroll={3}
            className="w-full h-full"
          >
            {products.map((currentProduct) => {
              return (
                <>
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
                      <Typography
                        className="line-clamp-1"
                        variant="h6"
                        color="blue-gray"
                      >
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
                    <CardFooter className="flex items-center justify-center pt-1">
                      <Link to={`/product-details/${currentProduct._id}`}>
                        <Typography className="font-normal text-blue-400 hover:underline hover:text-blue-800">
                          Acessar produto!
                        </Typography>
                      </Link>
                    </CardFooter>
                  </Card>
                </>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
}
