import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Progress,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";

export function OrderDetails() {
  const params = useParams();
  const [order, setOrder] = useState({});

  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(
          `/order/order-details/${params.orderId}`
        );
        setOrder(response.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchOrders();
  }, []);

  function handleProgress() {
    if (order.status === "SHIPPING") {
      return 25;
    } else if (order.status === "SHIPPED") {
      return 50;
    } else if (order.status === "OUT FOR DELIVERY") {
      return 75;
    } else if (order.status === "DELIVERED") {
      return 100;
    }
  }

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="mt-6">
      <div>
        <h1 className="mt-3 text-xl font-bold">Order Details</h1>
      </div>
      <div className="flex justify-center ">
        {!load && (
          <>
            <Card className="mt-8">
              <CardHeader color="green">
                <Typography color="white" size="xl">
                  ID do pedido: {order._id}
                </Typography>
              </CardHeader>
              <CardBody className="flex space-x-6 items-center ">
                <div className="flex gap-4  ">
                  <div className="w-76 h-96">
                    <img
                      className="w-full h-full "
                      src={`${order.productId.image}`}
                      alt={order.productId.productName}
                    />
                  </div>
                  <div className="px-24 bg-brown-50 bord ">
                    <Typography className="text-3xl font-bold text-green-500 uppercase mt-3 ">
                      {`${order.productId.productName}`}
                    </Typography>
                    <div className="flex justify-around mt-9 ">
                      <Typography className="text-2xl">
                        Quantity: {order.quantity}
                      </Typography>
                      <Typography className="text-2xl">
                        {formatter.format(order.totalPrice)}
                      </Typography>
                    </div>
                    <div className="mt-9">
                      <Typography className="text-xl font-semibold  text-blue-gray-600 ">
                        Seller address:
                      </Typography>
                      <Typography className="text-md">
                        {order.shipppingAdress}
                      </Typography>
                    </div>
                    <div className="mt-9">
                      <Typography className="text-xl font-semibold  text-blue-gray-600 ">
                        Delivery address:
                      </Typography>
                      <Typography className="text-md">
                        {`${order.buyerId.street}, ${order.buyerId.houseNumber}/${order.buyerId.apartmentNumber}, ${order.buyerId.neighborhood}. `}
                        {`${order.buyerId.city}, ${order.buyerId.state}`}
                      </Typography>
                    </div>
                    <div className="flex justify-around mt-12">
                      <Typography color="gray">
                        Order placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography className="text-xl font-semibold text-blue-gray-600 ">
                        Status: {order.status}
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pb-4">
                <span>{`${order.status}`}</span>
              </CardFooter>
              <Progress color="green" value={handleProgress()} />
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
