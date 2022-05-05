import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

const Index = ({ orders, products }) => {
  // to ensure that after deleting from mongodb, it also removes from the browser, use a state.
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["Preparing", "On the way", "Delivered"];

  // all api requests need async because you don't know how long it will take
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/products/" + id);
      setProductList(productList.filter((product) => product._id !== id));

      // updating state after deleting
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    // current status
    const item = orderList.filter((order) => order._id === id)[0]; // since return is an array, use zero to access first item
    const currentStatus = item.status;
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, { status: currentStatus + 1 });

      // without mutation
      setOrderList([res.data, ...orderList.filter((prev) => prev._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action </th>
            </tr>
          </thead>
          {productList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image src={product.image} width={50} height={50} objectFit="cover" alt="" />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button className={styles.button} onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 ? <span>Cash</span> : <span>Paid</span>}</td>
                <td>{status[order.status]}</td>
                <td>
                  {order.status === 2 ? (
                    <span>
                      <Image src="/image/correct.png" width={30} height="30" alt="completed"></Image>
                    </span>
                  ) : (
                    <button className={styles.buttonNext} onClick={() => handleStatus(order._id)}>
                      Next Stage
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // checking if user is logged in
  const myCookie = ctx.req?.cookies || ""; // if there is a request, we will get the cookie. Else, empty string

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false, // same tab
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
