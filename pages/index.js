import Head from "next/head";
import styles from "../styles/Home.module.css";
import Featured from "../components/Featured";
import Products from "../components/Products";
import Add from "../components/Add";
import AddButton from "../components/AddButton";

import axios from "axios";
import { useState } from "react";

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizzelo</title>
        <meta name="description" content="Pizza Restaurant in Singapore" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />

      {admin && <AddButton setClose={setClose} />}

      <Products productList={productList} />

      {!close && <Add setClose={setClose} />}
    </div>
  );
}

// Fetch data with server side rendering
export const getServerSideProps = async (ctx) => {
  // checking if user is logged in
  const myCookie = ctx.req?.cookies || ""; // if there is a request, we will get the cookie. Else, empty string
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      productList: res.data,
      admin,
    },
  };
};
