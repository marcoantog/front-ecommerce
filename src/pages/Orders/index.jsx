import { api } from "../../api/api";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/order/get`);

        setOrders([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }

    fetchOrders();
  }, []);
  return (
    <div className="">
      <div>
        <h1>Ordens</h1>
      </div>
      <div className="container flex mx-auto bg-gray-200 rounded-xl p-8 m-10 gap-7">
        <Slider
          dots={true}
          infinite={false}
          speed={500}
          slidesToShow={3}
          slidesToScroll={3}
          className="w-full gap-7"
        >
          {orders.map((currentOrder) => {
            return (
              <Link to={`/order-details/${currentOrder._id}`}>
                <Card
                  color="blue"
                  variant="gradient"
                  className="w-full max-w-[20rem] p-8 transition-scale duration-500 ease-in-out transform hover:scale-110 rounded-lg"
                  key={currentOrder._id}
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal uppercase"
                    >
                      {`${currentOrder.productId.productName}`}
                    </Typography>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mt-6 flex justify-center gap-1 text-sm font-normal"
                    >
                      {formatter.format(currentOrder.totalPrice)}
                    </Typography>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Pagamento: {currentOrder.payment}
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Quantidade: {currentOrder.quantity}
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Status: {currentOrder.status}
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon strokeWidth={2} className="h-3 w-3" />
                        </span>
                        <Typography className="font-normal">
                          Pedido efetuado:{" "}
                          {new Date(
                            currentOrder.createdAt
                          ).toLocaleDateString()}
                        </Typography>
                      </li>
                    </ul>
                  </CardBody>
                  <CardFooter className="mt-12 p-0">
                    <Button
                      size="lg"
                      color="white"
                      className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                      ripple={false}
                      fullWidth={true}
                    >
                      Ver detalhes
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
