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
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <h1>Categoria</h1>
      </div>
      {!load && (
        <div className="flex flex-col center">
          {filteredProducts.map((product, i) => {
            return (
              <div className="mt-5 max-w-fit flex" key={i}>
                <Link key={product._id} to={`/product-details/${product._id}`}>
                  <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-md md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-64 w-full object-cover md:w-64"
                        src={product.image}
                        alt={product.productName}
                      />
                    </div>
                    <div className="p-8 flex flex-col items-start md:flex-1">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        <p>{product.productName}</p>
                        <p className="mt-2 text-gray-600 text-sm">
                          {product.description}
                        </p>
                      </div>
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
                        Estado:{" "}
                        <span> {`${product.isUsed ? " usado" : " novo"}`}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
