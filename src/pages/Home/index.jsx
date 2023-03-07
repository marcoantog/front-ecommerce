import { useState, useEffect } from "react";
import { api } from "../../api/api";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
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
    <div className=""  >
      <div className="container flex mx-auto bg-gray-200 rounded-xl p-8 m-10 gap-7 " >
        {products.map((currentProduct) => {
          if(currentProduct.category === "CLOTHES"){
          return (
            <Card className="w-60"  key={currentProduct._id} >
            <CardHeader floated={false} className="h-40" >
              <img className="" src={currentProduct.image} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {currentProduct.productName}
              </Typography>
              <Typography color="blue" className="font-medium" textGradient>
                {currentProduct.description}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
             Like
            </CardFooter>
          </Card>
          ) 
        }})}
      </div>
      <div className="container flex mx-auto bg-gray-200 rounded-xl p-8 m-10 gap-7 " >
      {products.map((currentProduct) => {
          if(currentProduct.category === "TECHNOLOGY"){
          return (
            <Card className="w-60" key={currentProduct._id} >
            <CardHeader floated={false} className="h-40">
              <img className="" src={currentProduct.image} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {currentProduct.productName}
              </Typography>
              <Typography color="blue" className="font-medium" textGradient>
                {currentProduct.description}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              Like
            </CardFooter>
          </Card>
          ) 
        }})}
      </div>
      <div className="container flex mx-auto bg-gray-200 rounded-xl p-8 m-10 gap-7 " >
      {products.map((currentProduct) => {
          if(currentProduct.category === "HOUSE"){
          return (
            <Card className="w-60" key={currentProduct._id} >
            <CardHeader floated={false} className="h-40">
              <img className="" src={currentProduct.image} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {currentProduct.productName}
              </Typography>
              <Typography color="blue" className="font-medium" textGradient>
                {currentProduct.description}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
             Like
            </CardFooter>
          </Card>
          ) 
        }})}
      </div>
    </div>
  );
}
