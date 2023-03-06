import { useState, useEffect } from "react";
import { api } from "../../api/api";

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
    <>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS in action
        </p>
      </div>
      <div className="container flex mx-auto bg-gray-200 rounded-xl p-8 m-10 " >
        {products.map((currentProduct) => {
          return (
            <div>
          <h2 className="font-black" >{currentProduct.productName}</h2>
          <p className="text-sm" >{currentProduct.description}</p>
          {/* <img>{currentProduct.image}</img> */}
          </div>
          ) 
        })}
      </div>
    </>
  );
}
