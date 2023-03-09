import { useContext } from "react";
import { WishListContext } from "../../context/WishListContext";
import { Link } from "react-router-dom";

export function WishList() {
  const { wishList } = useContext(WishListContext);

  console.log(wishList);
  return (
    <div>
      <div>
        <h1>Favoritos</h1>
      </div>

      <div>
        {wishList.map((product) => {
          return (
            <Link to={`/product-details/${product._id}`}>
              <div className="mt-5" key={product._id}>
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
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
