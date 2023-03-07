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
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(
          `/order/order-details/${params.orderId}`
        );

        setOrder(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order Details</h1>
      <p>{order._id}</p>
    </div>
  );
}
