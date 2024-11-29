import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../css/normalize.css';
import '../css/sign-in.css';
import '../css/swiper-bundle.min.css';
import '../css/vendor.css';
import '../css/styles/style.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light text-uppercase fs-6 p-3 border-bottom align-items-center">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center w-100">
          <div className="col-auto">
            <a className="navbar-brand text-white" href="/">
              <img src={`${process.env.PUBLIC_URL}/myotherimages/logo.png`} alt="logo" style={{ width: '200px', height: 'auto' }} />
            </a>
          </div>
          <div className="col-auto">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 gap-1 gap-md-5 pe-3">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle active" href="#" id="dropdownHome" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</a>
                    <ul className="dropdown-menu list-unstyled" aria-labelledby="dropdownHome">
                      <li><a href="/andrew" className="dropdown-item item-anchor">Andrew Boun</a></li>
                      <li><a href="/kai" className="dropdown-item item-anchor">Kai Quach</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdownShop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop</a>
                    <ul className="dropdown-menu list-unstyled" aria-labelledby="dropdownShop">
                      <li><a href="/outerwear" className="dropdown-item item-anchor">Outerwear</a></li>
                      <li><a href="/pants" className="dropdown-item item-anchor">Pants</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;