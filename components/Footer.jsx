import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.brandName}>Pizzelo.</div>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>People disappoint, but pizza never does :)</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Find our restaurants</h1>
          <p className={styles.text}>
            11 Sam Leong Rd, #01-09 <br />
            Singapore 207903
          </p>
          <p className={styles.text}>
            11 Sam Leong Rd, #01-09 <br />
            Singapore 207903
          </p>
          <p className={styles.text}>
            11 Sam Leong Rd, #01-09 <br />
            Singapore 207903
          </p>
          <p className={styles.text}>
            11 Sam Leong Rd, #01-09 <br />
            Singapore 207903
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Working Hours</h1>
          <p className={styles.text}>
            Saturday - Sunday <br />
            12:00PM - 7:00PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
