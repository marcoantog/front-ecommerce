import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
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

  return (
    <div>
      <div>
        <h1>Order Details</h1>
      </div>
      <div>
        {!load && (
          <>
            <Card>
              <CardHeader color="green">
                <Typography color="white" size="xl">
                  Order {order._id}
                </Typography>
              </CardHeader>
              <CardBody className="flex space-x-6 ">
                <div>
                  <img src={`${order.productId.image}`} />
                </div>
                <div className="flex">
                  <div>
                    <Typography className="text-3xl font-bold ">
                      {`${order.productId.productName}  `}
                    </Typography>
                    <Typography className="text-2xl">
                      R${order.totalPrice}
                    </Typography>
                    <Typography className="text-2xl">
                      Quantidade: {order.quantity}
                    </Typography>
                  </div>
                  <Typography>{order.sellerId}</Typography>
                  <Typography>ff </Typography>
                </div>
              </CardBody>
              <CardFooter>
                <Typography color="gray">
                  Order placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
