import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { useRouter } from "next/router";

const Product = ({ singleProduct }) => {
  const [price, setPrice] = useState(singleProduct.prices[0]); // default small pizza size
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  // Redux
  const dispatch = useDispatch();

  const router = useRouter();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = singleProduct.prices[sizeIndex] - singleProduct.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]); // adding to array
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id)); // if extra_id not equal to option_id, just keep them in the array, else remove.
    }
  };

  // console.log(extras);

  // Redux: Add to cart
  const handleClick = () => {
    // Dispatch action that takes in a payload as an argument
    dispatch(addProduct({ ...singleProduct, extras, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={singleProduct.image} alt="" layout="fill" objectFit="contain"></Image>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{singleProduct.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc} style={{ marginTop: "2rem" }}>
          ${singleProduct.description}
        </p>

        <h3 className={styles.choose} style={{ marginTop: "2rem" }}>
          Choose the size
        </h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/image/size.png" alt="" layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/image/size.png" alt="" layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/image/size.png" alt="" layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose} style={{ marginTop: "2rem" }}>
          Choose additional ingredients
        </h3>
        <div className={styles.ingredients}>
          {singleProduct.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text} className={styles.label}>
                {option.text}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Fetch data with server side rendering
// params refer to the parameter ID in the browser URL
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);

  return {
    props: {
      singleProduct: res.data,
    },
  };
};

export default Product;
