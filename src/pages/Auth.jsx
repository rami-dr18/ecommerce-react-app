import React from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const { signUp, user, logOut, logIn } = React.useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [mode, setMode] = React.useState("signup");
  const [error, setError] = React.useState();
  function onSubmit(data) {
    setError(null);
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = logIn(data.email, data.password);
    }
    if (!result.success) {
      setError(result.error);
    } else {
      navigate("/");
    }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>user logged in {user.email}</p>}
          <button onClick={() => logOut()}>Logout</button>
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?
                <span className="auth-link" onClick={() => setMode("login")}>
                  Log In
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
