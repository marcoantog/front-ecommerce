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
      <h1>Product Details</h1>
      <p>{product.productName}</p>
    </div>
  );
}
