import { createContext, useState } from "react";

const WishListContext = createContext(null);

function WishListComponent(props) {
  const [wishList, setWishList] = useState([]);

  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {props.children}
    </WishListContext.Provider>
  );
}

export { WishListContext, WishListComponent };
