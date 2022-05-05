import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/Link";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product.image !== undefined) {
      setIsLoading(false);
    }
  });

  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`}>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <Image src={product.image} alt="" width="500" height="500" className={styles.image} />
        )}
      </Link>

      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>${product.prices[0]}</span>
      <p className={styles.desc}>{product.description}</p>
    </div>
  );
};

export default ProductCard;
