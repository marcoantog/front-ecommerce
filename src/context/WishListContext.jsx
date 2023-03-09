import { createContext, useEffect, useState } from "react";

const WishListContext = createContext(null);

function WishListComponent(props) {
  const productsWishList = JSON.parse(localStorage.getItem("wishList") || "[]");
  const [wishList, setWishList] = useState(productsWishList);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {props.children}
    </WishListContext.Provider>
  );
}

export { WishListContext, WishListComponent };
