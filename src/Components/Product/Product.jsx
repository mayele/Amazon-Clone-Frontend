import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "../Product/product.module.css";
import Loader from "../../Components/Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]); //Very important to inclue an ARRAY
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
        setisLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
            setisLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
            setisLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id}
            renderAdd={true}
             />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
