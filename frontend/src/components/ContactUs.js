import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/styles/style.css"; // Ensure you have the necessary CSS files

const ContactUs = () => {
  useEffect(() => {
    console.log("Initializing AOS");
    AOS.init();
  }, []);

  return (
    <section className="collection bg-light position-relative py-5">
      <div className="container">
        <div className="row">
          <div className="title-xlarge text-uppercase txt-fx domino"></div>
          <div className="collection-item d-flex flex-wrap my-5">
            <div className="col-md-6 column-container">
              <div className="image-holder">
                <img src="./myotherimages/cat.gif" alt="collection" className="product-image img-fluid" />
              </div>
            </div>
            <div className="col-md-6 column-container bg-white">
              <div className="collection-content p-5 m-0 m-md-5">
                <h3 className="element-title text-uppercase">Contact Us</h3>
                <p>Check out our pages!</p>
                <Link to="/andrew" className="btn btn-dark text-uppercase mt-3">Andrew Boun</Link>
                <Link to="/kai" className="btn btn-dark text-uppercase mt-3">Kai Quach</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;