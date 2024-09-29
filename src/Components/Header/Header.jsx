import React, { useContext } from "react";

import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";

import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItems = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  console.log(basket.length);
  return (
    <section className={classes.fixed}>
      <section className={classes.header_container}>
        <div className={classes.logo_container}>
          {/* logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          {/* Delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to Mesgana</p>
              <span>Virginia, USA</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          {/* search */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
          />
          {/* icon */}
          <BsSearch size={38} />
        </div>

        {/* right side link */}
        <div className={classes.order_container}>
          <Link to="" className={classes.language}>
            <img
              src="https://icons.iconarchive.com/icons/icons-land/vista-flags/128/United-States-Flag-1-icon.png"
              alt=""
            />
            <select>
              <option value="">EN</option>
              <option value="">EU</option>
            </select>
          </Link>

          {/* three components*/}

          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <div onClick={() => auth.signOut()}>
                  {" "}
                  <p>Hello {user?.email.split("@")[0]}</p> <span>Sign out</span>
                </div>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          {/* orders */}
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* cart  */}

          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{totalItems}</span>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
