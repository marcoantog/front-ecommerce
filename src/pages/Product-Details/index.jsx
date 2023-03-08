import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";

export function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});

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

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Product Details
        </h1>
      </div>
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
            <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
            <div className="mt-8 flex items-center justify-center ">
              <span className="text-green-500 font-semibold text-xl">
                R${product.price}
              </span>
            </div>
            <div className="flex justify-end mt-10">
              <button className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
                Add to Cart
              </button>
              <button className="ml-4 border rounded-lg px-4 py-2 hover:border-indigo-500">
                Buy Now
              </button>
              <p className="mx-12 font-bold  ">
                Em estoque: {product.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
