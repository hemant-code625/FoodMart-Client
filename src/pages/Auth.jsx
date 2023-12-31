import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingMessage("Logging in...");

    try {
      const userExists = await axios.get(
        `${import.meta.env.VITE_VERCEL_SERVER_URL}/auth/user-exists/${username}`
      );
      if (userExists.data.exists) {
        const result = await axios.post(
          `${import.meta.env.VITE_VERCEL_SERVER_URL}/auth/login`,
          {
            username,
            password,
          }
        );

        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        navigate("/");
      } else {
        setLoading(false);
        setLoadingMessage("");
        alert("User does not exist. Please register first.");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoadingMessage("");
    }
  };
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        {loadingMessage && <p>{loadingMessage}</p>}
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
    setLoading(true);
    setLoadingMessage("Registering...");

    try {
      await axios.post(
        `${import.meta.env.VITE_VERCEL_SERVER_URL}/auth/register`,
        {
          username,
          password,
        }
      );
      alert("Registration Completed! Now login.");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
        {loadingMessage && <p>{loadingMessage}</p>}
      </form>
    </div>
  );
};
