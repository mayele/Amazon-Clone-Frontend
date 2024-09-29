import { useContext, useState } from "react";
import classes from "./payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { axiosInstance } from "../../api/axios";
import { ClipLoader } from "react-spinners";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  //Function to handle credit card entry errors
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  //Reduce function using the reduce hood to bring in the total amount
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  //Payment processing function
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      //1. backend || function ---->contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2. Client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);

      // 3. after the confirmation -->order firestore database save, clear
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      //empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", {
        state: { msg: "You have placed successfully placed an order" },
      });
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1234 Main Street</div>
            <div>Miami, FL 20330</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_card_form_container}>
              <div className={classes.payment_details}>
                <form onSubmit={handlePayment}>
                  {cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                  )}
                  <div style={{ height: "5px" }}></div>
                  <CardElement onChange={handleChange} />
                  <div className={classes.payment_price}>
                    <div>
                      <span style={{ display: "flex", gap: "10px" }}>
                        <p>Total Order | </p>
                        <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button type="submit">
                      {processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please wait ...</p>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </section>
    </Layout>
  );
}

export default Payment;
