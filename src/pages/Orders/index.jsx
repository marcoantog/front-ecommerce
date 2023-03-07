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

export function Orders(){

    const [orders, setOrders] = useState([]);

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

    return(
        <div className="flex">
        <h1>Ordens</h1>
        {orders.map((currentOrder) => {
            return (
            <Card color="blue" variant="gradient" className="w-full max-w-[20rem] p-8" key={currentOrder._id} >
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
                standard
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-6 flex justify-center gap-1 text-sm font-normal"
              >
                {currentOrder._id}
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                  </span>
                  <Typography className="font-normal">5 team members</Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                  </span>
                  <Typography className="font-normal">200+ components</Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                  </span>
                  <Typography className="font-normal">40+ built-in pages</Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                  </span>
                  <Typography className="font-normal">1 year free updates</Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon strokeWidth={2} className="h-3 w-3" />
                  </span>
                  <Typography className="font-normal">Life time technical support</Typography>
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
                Buy Now
              </Button>
            </CardFooter>
          </Card>
            )
        })}
        </div>
    )
}