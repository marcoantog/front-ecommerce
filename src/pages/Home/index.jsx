import { useState, useEffect, useContext } from "react";
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
import SearchBar from "../../components/SearchBar";
import { AuthContext } from "../../context/authContext";

export function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { loggedInUser } = useContext(AuthContext);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (loggedInUser) {
          const response = await api.get("/product");

          setProducts([...response.data]);
          setLoad(false);
        }
        return;
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <div className={loggedInUser ? "hidden" : "m-8 flex justify-center"}>
      <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                className="w-full h-full"
              > <div><Link to="/category-products/HOUSE"><img src={"https://i.imgur.com/HOrfDlV.png"} alt="House Category" /> </Link></div>
              <div><Link to="/category-products/TECHNOLOGY"><img src={"https://i.imgur.com/nUczHgS.png"} alt="Technology Category" /> </Link></div>
              <div><Link to="/category-products/CLOTHES"><img src={"https://i.imgur.com/jLdGh0v.png"} alt="Clothes Category" /> </Link></div>
              </Slider>
        
      </div>
      {!load && (
        <>
          <div className={loggedInUser ? "" : "hidden"}>
            <SearchBar search={search} setSearch={setSearch} />

            <div className="grid justify-items-end mr-7 mt-10 font-bold text-2xl text-gray-400 hover:text-gray-500">
              <Link to="/category-products/CLOTHES"> Roupas</Link>
            </div>

            <div className="flex mx-auto bg-gray-300 rounded-xl p-8 shadow-lg">
              <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={3}
                slidesToScroll={3}
                className="w-full h-full"
              >
                {products
                  .filter((product) => {
                    return product.productName
                      .toLocaleLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .map((currentProduct, i, array) => {
                    if (
                      currentProduct.category === "CLOTHES" &&
                      currentProduct.isAvaliable === true
                    ) {
                      return (
                        <Card
                          className="max-w-[18rem] max-h-[20rem] overflow-hidden"
                          key={currentProduct._id}
                        >
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none grid justify-items-center relative"
                          >
                            <img
                              src={currentProduct.image}
                              alt={currentProduct.name}
                              className="h-28 pt-2 bg-cover"
                            />
                            <div
                              className={
                                currentProduct.quantity === 0
                                  ? "absolute mt-12 text-red-500 font-bold bg-white bg-opacity-80 w-full"
                                  : "hidden"
                              }
                            >
                              Esgotado
                            </div>
                          </CardHeader>
                          <CardBody className="pb-1 pt-1">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="line-clamp-1"
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

            <div className="grid justify-items-end mr-7 mt-10 font-bold text-2xl text-gray-400 hover:text-gray-500 ">
              <Link to="/category-products/TECHNOLOGY">Tecnologia</Link>
            </div>

            <div className="flex mx-auto bg-gray-300 rounded-xl p-8 shadow-lg ">
              <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={3}
                slidesToScroll={3}
                className="w-full h-full"
              >
                {products
                  .filter((product) => {
                    return product.productName
                      .toLocaleLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .map((currentProduct, i, array) => {
                    if (
                      currentProduct.category === "TECHNOLOGY" &&
                      currentProduct.isAvaliable === true
                    ) {
                      return (
                        <Card
                          className="max-w-[18rem] max-h-[20rem] overflow-hidden"
                          key={currentProduct._id}
                        >
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none grid justify-items-center relative"
                          >
                            <img
                              src={currentProduct.image}
                              alt={currentProduct.name}
                              className="h-28 pt-2 bg-cover"
                            />
                            <div
                              className={
                                currentProduct.quantity === 0
                                  ? "absolute mt-12 text-red-500 font-bold bg-white bg-opacity-80 w-full"
                                  : "hidden"
                              }
                            >
                              Esgotado
                            </div>
                          </CardHeader>
                          <CardBody className="pb-1 pt-1">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="line-clamp-1"
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

            <div className="grid justify-items-end mr-7 mt-10 font-bold text-2xl text-gray-400 hover:text-gray-500 ">
              <Link to="/category-products/HOUSE">Casa</Link>
            </div>

            <div className="flex mx-auto bg-gray-300 rounded-xl p-8 shadow-lg">
              <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={3}
                slidesToScroll={3}
                className="w-full h-full"
              >
                {products
                  .filter((product) => {
                    return product.productName
                      .toLocaleLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .map((currentProduct) => {
                    if (
                      currentProduct.category === "HOUSE" &&
                      currentProduct.isAvaliable === true
                    ) {
                      return (
                        <Card
                          className="max-w-[18rem] max-h-[20rem] overflow-hidden"
                          key={currentProduct._id}
                        >
                          <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="m-0 rounded-none grid justify-items-center relative"
                          >
                            <img
                              src={currentProduct.image}
                              alt={currentProduct.name}
                              className="h-28 pt-2 bg-cover"
                            />
                            <div
                              className={
                                currentProduct.quantity === 0
                                  ? "absolute mt-12 text-red-500 font-bold bg-white bg-opacity-80 w-full"
                                  : "hidden"
                              }
                            >
                              Esgotado
                            </div>
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
        </>
      )}
    </>
  );
}
