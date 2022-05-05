import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);

  const images = ["/image/featured2.png", "/image/featured3.png", "/image/featured.png"];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 1);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 20 }} onClick={() => handleArrow("l")}>
        <Image src="/image/right-arrow.png" alt="" layout="fill" objectFit="contain"></Image>
      </div>
      <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
        {images.map((image, index) => (
          <div className={styles.imgContainer} key={index}>
            <Image src={image} alt="" layout="fill" objectFit="contain"></Image>
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 20 }} onClick={() => handleArrow("r")}>
        <Image src="/image/right-arrow.png" alt="" layout="fill" objectFit="contain"></Image>
      </div>
    </div>
  );
};

export default Featured;
