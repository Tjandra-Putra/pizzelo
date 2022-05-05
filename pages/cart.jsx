import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

import { useState } from "react";
import { reset } from "../redux/cartSlice";

import OrderDetail from "../components/orderDetail";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // getting from store
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);

      // if everything worlks, will redirect user to order page
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/order/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.pageTitle}>Shopping Cart</div>
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <thead className={styles.rowHeader}>
              <tr>
                <th className={styles.th}>Product</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Extras</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Quantity</th>
                <th className={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((product) => (
                <tr className={styles.tr} key={product._id}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image src={product.image} layout="fill" objectFit="cover" alt="" />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {product.extras.map((extra) => (
                        <span key={extra._id}>{extra.text}, </span>
                      ))}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>${product.price}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>${product.quantity * product.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>Cart Total</h2>

            <div className={styles.totalText}>
              <div className={styles.totalTextTitle}>
                Subtotal: <span>${cart.total}</span>
              </div>
            </div>

            <div className={styles.totalText}>
              <div className={styles.totalTextTitle}>
                Discount: <span>$0.00</span>
              </div>
            </div>

            <div className={styles.totalText}>
              <div className={styles.totalTextTitle}>
                Total: <span>${cart.total}</span>
              </div>
            </div>
            {open ? (
              <div className={styles.paymentMethods}>
                <button className={styles.payButton} onClick={() => setCash(true)}>
                  Cash On Delivery
                </button>
              </div>
            ) : (
              <button className={styles.button} onClick={() => setOpen(true)}>
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
        {/* If payment method is cash */}
        {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
      </div>
    </>
  );
};

export default Cart;
