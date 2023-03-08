import { useContext } from "react";
import { WishListContext } from "../../context/WishListContext";

export function WishList() {
  const { wishList } = useContext(WishListContext);

  console.log(wishList);
  return (
    <div>
      <div>
        <h1>Favoritos</h1>
      </div>
      <div>
        {wishList.map((product) => (
          <div key={product._id}>
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.productName} />
          </div>
        ))}
      </div>
    </div>
  );
}
