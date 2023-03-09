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
  DialogFooter,
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
    setWishList([...wishList, product]);
  }


  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Product Details
          </h1>
        </div>
        {!load && (
          <div>
            <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-md md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-64 w-full object-cover md:w-64"
                  src={product.image}
                  alt={product.productName}
                />
              </div>
              <div className="p-8 md:flex-1">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {product.productName}
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  {product.description}
                </p>

                <div className="mt-8 flex items-center justify-center ">
                  <span className="text-green-500 font-semibold text-xl">
                    R${product.price}
                  </span>
                </div>
                <div>
                  <p className="mx-12 font-bold  ">
                    Em estoque: {product.quantity}
                  </p>
                </div>
                <div className="flex justify-center mt-10">
                  <button className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
                    Add to Cart
                  </button>
                  <Button
                    className="ml-4 border rounded-lg px-4 py-2 hover:border-indigo-500"
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
              <div className="flex justify-center mt-10">
                <button
                  onClick={addToWishList}
                  className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-700"
                >
                  Add to wishlist
                </button>
                <button className="ml-4 border rounded-lg px-4 py-2 hover:border-indigo-500">
                  Buy Now
                </button>
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
