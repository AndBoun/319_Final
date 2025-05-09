import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../config';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Bypass validation for admin credentials
    if (data.email === 'admin' && data.password === 'admin') {
      localStorage.setItem('token', 'admin-token'); // Store a dummy token
      navigate('/admin'); // Redirect to admin page
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token); // Store the token in localStorage
        navigate('/account'); // Redirect to account page
      } else {
        const result = await response.json();
        setServerError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setServerError('Failed to login');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register("email", {
                      required: "Email is required",
                      validate: value => value === 'admin' || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || "Invalid email address"
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register("password", {
                      required: "Password is required",
                      validate: value => value === 'admin' || value.length >= 6 || "Password must be at least 6 characters"
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>
                {serverError && (
                  <div className="alert alert-danger" role="alert">
                    {serverError}
                  </div>
                )}
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Login
                </button>
                <div className="text-center mt-3">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/register">Register here</Link>
                </div>
                <div className="text-center mt-3">
                  <Link to="/recover-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;