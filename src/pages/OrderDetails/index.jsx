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
        <h1>Order Details</h1>
      </div>
      <div className="flex justify-center ">
        {!load && (
          <>
            <Card>
              <CardHeader color="green">
                <Typography color="white" size="xl">
                  Order {order._id}
                </Typography>
              </CardHeader>
              <CardBody className="flex space-x-6 items-center ">
                <div>
                  <img
                    className="max-h-60 max-w-3xl"
                    src={`${order.productId.image}`}
                    alt={order.productId.productName}
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <Typography className="text-3xl font-bold">
                      {`${order.productId.productName}`}
                    </Typography>
                    <Typography className="text-2xl">
                      {formatter.format(order.totalPrice)}
                    </Typography>
                    <Typography className="text-2xl">
                      Quantity: {order.quantity}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-xl font-bold">
                      Seller address:
                    </Typography>
                    <Typography>{order.shipppingAdress}</Typography>

                    <Typography className="text-xl font-bold">
                      Delivery address:
                    </Typography>
                    <Typography>
                      {`${order.buyerId.street}, ${order.buyerId.houseNumber}/${order.buyerId.apartmentNumber}, ${order.buyerId.neighborhood}`}
                    </Typography>
                    <Typography>
                      {`${order.buyerId.city}, ${order.buyerId.state}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-xl font-bold">
                      Status: {order.status}
                    </Typography>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Typography color="gray">
                  Order placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </CardFooter>
              <span>{`${order.status}`}</span>
              <Progress value={handleProgress()} />
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
