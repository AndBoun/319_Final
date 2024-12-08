import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../css/normalize.css';
import '../css/sign-in.css';
import '../css/swiper-bundle.min.css';
import '../css/vendor.css';
import '../css/styles/style.css';

const Navbar = () => {

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setTotal(total + item.price);
  };


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light text-uppercase fs-6 p-3 border-bottom align-items-center">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center w-100">
          <div className="col-auto">
            <Link className="navbar-brand text-white" to="/">
              <img src={`${process.env.PUBLIC_URL}/myotherimages/logo.png`} alt="logo" style={{ width: '200px', height: 'auto' }} />
            </Link>
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
                      <li><Link to="/andrew" className="dropdown-item item-anchor">Andrew Boun</Link></li>
                      <li><Link to="/kai" className="dropdown-item item-anchor">Kai Quach</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdownShop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop</a>
                    <ul className="dropdown-menu list-unstyled" aria-labelledby="dropdownShop">
                      <li><Link to="/outerwear" className="dropdown-item item-anchor">Outerwear</Link></li>
                      <li><Link to="/pants" className="dropdown-item item-anchor">Pants</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <svg className="bi" width="24" height="24" fill="currentColor">
                        <use xlinkHref="#user" />
                      </svg>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button className="btn btn-link nav-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                      <svg className="bi" width="24" height="24" fill="currentColor">
                        <use xlinkHref="#cart" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="My Cart">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">XXXX</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Growers cider</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Fresh grapes</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$8</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Heinz tomato ketchup</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
              </li>
            </ul>
            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;