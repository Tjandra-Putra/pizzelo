import styles from "../styles/OrderDetail.module.css";
import { useState } from "react";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 }); // method for cash is 0, paypal is 1
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Please pay $12 after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        {/* <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="1234 5678"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div> */}
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            type="text"
            placeholder="Novena Street 25 SG123456"
            className={styles.textarea}
            rows={7}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
