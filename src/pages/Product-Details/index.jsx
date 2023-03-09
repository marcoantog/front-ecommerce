import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ConfirmOrder from "../ConfirmOrder";
import { WishListContext } from "../../context/WishListContext";

export function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const { loggedInUser } = useContext(AuthContext);
  const [load, setLoad] = useState(true);
  const [size, setSize] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setSize(value);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get(
          `/product/product-details/${params.productId}`
        );
        setProduct(response.data);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/profile`);
        setUser({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  const { wishList, setWishList } = useContext(WishListContext);

  function addToWishList() {
    if (!wishList.includes(product)) {
      setWishList([...wishList, product]);
    }
  }

  const handleToggle = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <div>
        {!load && (
          <div>
            <div className="max-w-6xl mx-auto bg-purple-50 overflow-hidden shadow-md flex justify-center flex-wrap mt-10">
              <div className="flex justify-end p-3 w-full mr-8">
                <button
                  onClick={addToWishList}
                  className={
                    wishList.includes(product)
                      ? "text-red-700 w-1"
                      : "hover:text-red-700 w-1"
                  }
                >
                  <span className="text-3xl">❤</span>
                </button>
              </div>
              <div className="grid justify-items-center uppercase tracking-wide text-2xl text-indigo-500 font-semibold w-full">
                {product.productName}
              </div>

              <div className="flex justify-center w-full mt-5">
                <div className="m-0 rounded-none grid justify-items-center relative">
                  <img
                    className="h-96 w-96 bg-cover"
                    src={product.image}
                    alt={product.productName}
                  />
                  <div
                    className={
                      product.quantity === 0
                        ? "absolute mt-44 text-red-500 font-bold bg-white bg-opacity-80 w-full text-4xl"
                        : "hidden"
                    }
                  >
                    Esgotado
                  </div>
                </div>
              </div>
              <div className="p-8 md:flex-1">
                <div className="mt-8 flex justify-center ">
                  <span className="text-green-500 font-semibold text-xl">
                    {formatter.format(product.price)}
                  </span>
                </div>
                <Accordion open={open === 0}>
                  <AccordionHeader onClick={() => handleToggle(1)}>
                    Descrição
                  </AccordionHeader>
                  <AccordionBody>{product.description}</AccordionBody>
                </Accordion>
                <p className="mt-2 text-gray-600 text-sm"></p>

                <div className="flex justify-center mt-10">
                  <div className="py-2">
                    <p className="font-bold  ">
                      Quantidade: {product.quantity}
                    </p>
                  </div>
                  <Button
                    className={
                      product.quantity === 0
                        ? "hidden"
                        : "ml-4 border rounded-lg px-4 py-2 hover:border-indigo-500"
                    }
                    onClick={() => handleOpen("xl")}
                    variant="gradient"
                  >
                    Buy Now
                  </Button>
                  {product.sellerId._id === loggedInUser.user._id && (
                    <Link to={`/edit-product/${product._id}`}>
                      <button className="bg-yellow-400 ml-4 border rounded-lg px-8 py-2 hover:border-indigo-500">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Dialog open={size === "xl"} size={size || "md"} handler={handleOpen}>
        <DialogHeader>
          <div className="flex w-full justify-between">
            <div>Confirmação de compra</div>
            <div>
              <Button
                variant="text"
                color="red"
                onClick={() => handleOpen(null)}
                className="mr-1"
              >
                <span>X</span>
              </Button>
            </div>
          </div>
        </DialogHeader>
        <DialogBody divider>
          <ConfirmOrder product={product} user={user} />
        </DialogBody>
      </Dialog>
    </>
  );
}
