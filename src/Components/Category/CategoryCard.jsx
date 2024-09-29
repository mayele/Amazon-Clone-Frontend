// import React from "react";
import classes from "../Category/category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div className={classes.category} key={data.id}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
          <img src={data.imgLink} alt="" />
          <p>Shop Now</p>
        </span>
      </Link>
    </div>
  );
}

export default CategoryCard;
