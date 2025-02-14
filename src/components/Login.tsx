import React from "react";
import ReactDOM from "react-dom/client";
import "../css/Login.css";
import { useState } from "react";
import { auth } from "../../config/firebase";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<firebase.User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      userCredential.user && setUser(userCredential.user);
      console.log(userCredential);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="Login">
        {/* <Header/> */}

        <div className="container mt-5">
          <div className="Login-content">
            <div className="Login-h"></div>
            <h2>Login</h2>
            <form className="Login-form" id="Login-form">
              {/* Email */}
              <div className="login-form-group">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Checkbox */}
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  className="checkbox"
                  onClick={toggle}
                />{" "}
                Show Password
              </div>
              <div>
                <a href="/signup">Don't have an account? Sign Up</a>
              </div>
              {/* Submit */}
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="Login"
                  id="Login"
                  className="form-submit"
                  value="Login"
                  onClick={handleLogin}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
