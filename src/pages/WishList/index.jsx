import { useContext, useEffect } from "react";
import { WishListContext } from "../../context/WishListContext";
import { Link, useSearchParams } from "react-router-dom";

export function WishList() {
  const { wishList, setWishList } = useContext(WishListContext);

  function removeFromWishList(productId) {
    const updatedWishList = wishList.filter(
      (product) => product._id !== productId
    );
    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    setWishList(updatedWishList);
  }

  useEffect(() => {
    try {
      removeFromWishList(wishList._id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Favoritos</h1>
      </div>

      <div className="grid w-full flex-col justify-center">
        {wishList.map((product, i) => {
          return (
            <div
              key={product._id}
              className="w-6xl mt-3 bg-white rounded-lg overflow-hidden shadow-md md:flex"
            >
              <div className="md:flex-shrink-0">
                <img
                  className="h-64 w-full object-cover md:w-64"
                  src={product.image}
                  alt={product.productName}
                />
              </div>
              <div className="p-5  md:flex-1">
                <div className=" flex justify-around gap-40 uppercase tracking-wide text-3xl text-indigo-500 font-bold line-clamp-1">
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
                  <div className="line-clamp-3">
                    <p className="mt-8 text-gray-600 text-lg ">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-around mt-3">
                  <Link to={`/product-details/${product._id}`}>
                    <button className="bg-indigo-500 ml-4 border rounded-lg px-4 py-2 hover:border-indigo-500">
                      ver mais
                    </button>
                  </Link>
                  <button
                    className="bg-red-400 ml-4 border rounded-lg px-8 py-2 hover:border-indigo-500"
                    onClick={() => removeFromWishList(product._id)}
                  >
                    remover
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
