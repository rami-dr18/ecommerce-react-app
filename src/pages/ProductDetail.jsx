import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  useEffect(() => {
    const foundProfuct = getProductById(id);
    if (!foundProfuct) {
      navigate("/");
      return;
    }
    setProduct(foundProfuct);
    console.log(foundProfuct);
  }, [id]);
  if (!product) {
    return <h1>Loading....</h1>;
  }

  const productInCart = cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt="product.name" />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">{product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn tbn-priamry"
              onClick={() => addToCart(product.id)}
            >
              Add to Card {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
