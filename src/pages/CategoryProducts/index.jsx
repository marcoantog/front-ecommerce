import { api } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [load, setLoad] = useState(true);

  const { category } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/product");
        setLoad(false);

        setProducts([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.category === category && product.isAvaliable === true
      );
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <h1 className="mt-3 text-xl font-bold">{category}</h1>
      </div>
      {!load && (
        <div className="grid w-full flex-col justify-center">
          {filteredProducts.map((product, i) => {
            return (
              <Link key={product._id} to={`/product-details/${product._id}`}>
                <div className="w-6xl mt-8 bg-white rounded-lg overflow-hidden shadow-md md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-64 w-full object-cover md:w-64"
                      src={product.image}
                      alt={product.productName}
                    />
                  </div>
                  <div className="p-5  md:flex-1">
                    <div className=" flex justify-around gap-40 uppercase tracking-wide text-3xl text-indigo-500 font-bold">
                      <p>{product.productName}</p>
                      <span className="text-green-500 font-semibold text-3xl">
                        R${product.price}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xl mt-10">
                        <span className="font-bold ml-4">
                          Estado: {`${product.isUsed ? " usado" : " novo"}`}
                        </span>
                        <p className="font-bold mr-4 ">
                          Em estoque: {product.quantity}
                        </p>
                      </div>
                      <p className="mt-8 text-gray-600 text-lg line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
