import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  // making login request
  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth", {
        username,
        password,
      });

      router.push("/admin");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <input type="text" placeholder="admin" className={styles.input} onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {/* If there is an error*/}
        {error && <small className={styles.error}>Wrong credentials.</small>}
      </div>
    </div>
  );
};

export default Login;
