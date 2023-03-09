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

      <div className="grid w-full flex-col justify-center">
        {wishList.map((product, i) => {
          return (
            <Link key={product._id} to={`/product-details/${product._id}`}>
              <div className="w-6xl mt-3 bg-white rounded-lg overflow-hidden shadow-md md:flex">
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
                    <p className="mt-8 text-gray-600 text-lg">
                      {product.description}
                    </p>
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
