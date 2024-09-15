import React, { useState } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.auth === true) localStorage.setItem("jelenaJWT", data.token);
      setLoggedIn(true);
    }
  };
  return (
    <div className={styles.loginWrapper}>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link href="/">Početna stranica</Link>
      </form>
    </div>
  );
};

export default Login;
