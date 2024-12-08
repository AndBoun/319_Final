import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/styles/style.css";
import AOS from "aos";
import "aos/dist/aos.css";



const LoginPage = () => {
  return (
    <section data-section-id="login" data-section-type="login">
      <div className="Container login-container" id="collection-container">
        <div className="PageContent PageContent--fitScreen PageContent--extraNarrow">
          <form method="post" action="/account/recover" acceptCharset="UTF-8">
            <input type="hidden" name="form_type" value="recover_customer_password" />
            <input type="hidden" name="utf8" value="✓" />
          </form>
          <form method="post" action="/account/login" id="customer_login" acceptCharset="UTF-8" data-login-with-shop-sign-in="true" name="login" className="Form Form--spacingTight" style={{ display: 'block' }}>
            <input type="hidden" name="form_type" value="customer_login" />
            <input type="hidden" name="utf8" value="✓" />
            <header className="Form__Header">
              <h1 className="Form__Title Heading u-h1">Login</h1>
              <p className="Form__Legend">Please enter your e-mail and password:</p>
            </header>
            <div className="Form__Item">
              <input type="email" className="Form__Input" name="customer[email]" required placeholder="Email" aria-label="Email" autoFocus />
              <label className="Form__FloatingLabel">Email</label>
            </div>
            <div className="Form__Item">
              <input type="password" className="Form__Input" name="customer[password]" required placeholder="Password" aria-label="Password" />
              <label className="Form__FloatingLabel">Password</label>
              <button type="button" className="Form__ItemHelp Link Link--primary" data-action="toggle-recover-form">Forgot password?</button>
            </div>
            <button type="submit" className="Form__Submit Button Button--primary Button--full">Login</button>
            <div className="Form__Hint Form__Hint--center">
              <span className="Text--subdued">Don't have an account?</span>
              <a href="/account/register" className="Link Link--secondary">Create one</a>
            </div>
            <input type="hidden" name="return_url" value="/account" />
            <input type="hidden" name="login_with_shop[analytics_trace_id]" value="6a8ebb58-10a9-4b1e-acce-d8b3599276e2" />
          </form>
          <form method="post" action="/account/recover" id="recover_customer_password" acceptCharset="UTF-8" name="recover" className="Form Form--spacingTight" style={{ display: 'none' }}>
            <input type="hidden" name="form_type" value="recover_customer_password" />
            <input type="hidden" name="utf8" value="✓" />
            <header className="Form__Header">
              <h1 className="Form__Title Heading u-h1">Recover password</h1>
              <p className="Form__Legend">Please enter your email:</p>
            </header>
            <div className="Form__Item">
              <input type="email" className="Form__Input" name="email" required placeholder="Email" aria-label="Email" autoFocus />
              <label className="Form__FloatingLabel">Email</label>
            </div>
            <button type="submit" className="Form__Submit Button Button--primary Button--full">Recover</button>
            <div className="Form__Hint Form__Hint--center">
              <span className="Text--subdued">Remember your password?</span>
              <button type="button" className="Link Link--secondary" data-action="toggle-recover-form">Back to login</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;