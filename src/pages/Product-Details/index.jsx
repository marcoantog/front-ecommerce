import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { WishListContext } from "../../context/WishListContext";

export function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [load, setLoad] = useState(true);

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

  const { wishList, setWishList } = useContext(WishListContext);

  function addToWishList() {
    setWishList([...wishList, product]);
  }

  return (
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
        </div>
      )}
    </div>
  );
}
