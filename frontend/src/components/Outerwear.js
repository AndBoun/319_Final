import React, { useEffect, useState } from "react";
import { API_URL } from '../config';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/styles/style.css";
import "../css/vendor.css";

import AOS from "aos";
import "aos/dist/aos.css";

const Outerwear = ({ addToCart }) => {
  const [outerwearItems, setOuterwearItems] = useState([]);

  useEffect(() => {
    console.log("Initializing AOS");
    AOS.init();
  }, []);

  useEffect(() => {
    console.log("Fetching data");

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/outerwear-data`);
        const data = await response.json();
        if (data && data.length > 0) {
          setOuterwearItems(data[0].OuterwearPageShop);
          console.log("Fetched outerwear data", data[0].OuterwearPageShop);
        }
      } catch (error) {
        console.error("Error fetching outerwear data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="categories overflow-hidden">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Outerwear</h4>
        </div>
        <div className="row" id="outerwearList">
          {outerwearItems.length > 0 ? (
            outerwearItems.map((element, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="swiper-slide">
                  <div className="product-item image-zoom-effect link-effect">
                    <div className="image-holder position-relative">
                      <Link to="/outerwear">
                        <img
                          src={`${API_URL}/${element.image}`}
                          alt={element.attribute}
                          className="product-image img-fluid"
                        />
                      </Link>
                      <Link to="/outerwear" className="btn-icon btn-wishlist">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <use xlinkHref="#heart"></use>
                        </svg>
                      </Link>
                    </div>
                    <div className="product-content">
                      <h5 className="element-title text-uppercase fs-5 mt-3">
                        <Link to="/outerwear">{element.item}</Link>
                      </h5>
                      <p>{element.productDescription}</p>
                      <p className="price-tag">${element.price}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart({
                          name: element.item,
                          description: element.productDescription,
                          price: element.price,
                          image: element.image,
                          attributes: element.attribute
                        })}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No outerwear items found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Outerwear;