import React, { Component, useState } from 'react';
import styles from "./login.module.css";
const Login = (onLogin) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleSubmit(event) {
      event.preventDefault();
      // perform validation and API call here
      onLogin()
    }
  
    return (
      <form onSubmit={handleSubmit} className={styles.formLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button  type="submit">Login</button>
      </form>
    );
}

export default Login;