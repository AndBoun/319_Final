import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Footer = () => {
  return (
    <footer id="footer" className="mt-5">
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-between py-5">
          {/* Main Logo Section */}
          <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center">
            <div className="footer-menu footer-menu-001">
              <div className="footer-intro mb-4">
              <Link className="navbar-brand text-white" to="/">
                  <img
                    src={`${API_URL}/myotherimages/logo.png`}
                    alt="logo"
                    style={{ width: '200px', height: 'auto' }}
                  />
                </Link>
              </div>
              <p></p>
              {/* Social Media Links */}
              <div className="social-links">
                <ul className="list-unstyled d-flex justify-content-center gap-3">
                 <li>
                    <a
                      href="https://www.facebook.com"
                      className="text-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use href="#facebook"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.twitter.com"
                      className="text-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use href="#twitter"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com"
                      className="text-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use href="#youtube"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.pinterest.com"
                      className="text-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use href="#pinterest"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com"
                      className="text-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use href="#instagram"></use>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-002">
              <h5 className="widget-title text-uppercase mb-4">Quick Links</h5>
              <ul className="menu-list list-unstyled text-uppercase border-animation-left fs-6">
                <li className="menu-item">
                  <Link to="/" className="item-anchor">Home</Link>
                </li>
                <li className="menu-item">
                  <Link to="/andrew" className="item-anchor">Andrew Boun</Link>
                </li>
                <li className="menu-item">
                  <Link to="/kai" className="item-anchor">Kai Quach</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Help & Info Section */}
          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-003">
              <h5 className="widget-title text-uppercase mb-4">Help & Info</h5>
              <ul className="menu-list list-unstyled text-uppercase border-animation-left fs-6">
                <li className="menu-item">
                  <Link to="/contactUs" className="item-anchor">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-top py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex flex-wrap">
              <div className="shipping">
                <span></span>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <p>© Andrew & Kai 2024.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
