import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
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
            <button className="btn tbn-priamry">Add to Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
