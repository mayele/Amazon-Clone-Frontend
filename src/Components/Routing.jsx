import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Payment from "../Pages/Payment/Payment";
import Cart from "../Pages/Cart/Cart";
import Orders from "../Pages/Orders/Orders";
import Results from "../Pages/Results/Results";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import Auth from "../Pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51Q3AyARxFAlyHZqxFy0E0UowderP4dpQx0DMQgvKRcy1rWd7WhsiFNTT47bxUok3AtvLojZlw2GkChrcEr09Lu3H00pC2QABs0"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must log in to see your orders"}
              redirect={"/orders"}
            >
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
