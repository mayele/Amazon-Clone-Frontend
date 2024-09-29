import React from "react";
import { categoryInfo } from "./categoryFullInfo";
import CategoryCard from "./CategoryCard";
import classes from "../Category/category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryInfo.map((info) => (
     
        // eslint-disable-next-line react/jsx-key
        <CategoryCard data={info} />
      ))}
    </section>
  );
}

export default Category;
