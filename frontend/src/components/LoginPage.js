import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [showRecovery, setShowRecovery] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login attempt:", loginData);
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    // Add your password recovery logic here
    console.log("Recovery attempt:", recoveryEmail);
  };

  const toggleRecoveryForm = () => setShowRecovery(!showRecovery);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          {!showRecovery ? (
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Login
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={toggleRecoveryForm}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/register">Create one</Link>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Recover Password</h2>
                <form onSubmit={handleRecoverySubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Recover
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={toggleRecoveryForm}
                    >
                      Back to login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;