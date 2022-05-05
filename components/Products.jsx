import styles from "../styles/Products.module.css";
import ProductCard from "./ProductCard";
const Products = ({ productList }) => {
  console.log(productList);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The Best Pizza You Will Only Have</h1>
      <p className={styles.desc}>
        It is our commitment to be the best pizza joint in Singapore and offer great value for all pizza lovers from
        around the world.
      </p>

      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
