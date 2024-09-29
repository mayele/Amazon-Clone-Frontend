import React, { useEffect, useState } from "react";
import classes from "./productDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setisLoading] = useState(false);

  // useEffect(() => {
  //   setisLoading(true);
  //   axios
  //     .get(`${productUrl}/products/${productId}`)
  //     .then((res) => {
  //       setProduct(res.data);
  //       setisLoading(false);
  //     })
  //     .catch((err) => {
  //       setisLoading(false);
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log(res);
        // setProduct(res.data);
        setProduct(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);

  console.log(product);
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard product={product} flex={true} renderDesc={true}
        renderAdd={true} />
      )}
    </Layout>
  );
}

export default ProductDetail;
