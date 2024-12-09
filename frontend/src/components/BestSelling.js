import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from '../config';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../css/normalize.css";
import "../css/sign-in.css";
import "../css/swiper-bundle.min.css";
import "../css/vendor.css";
import "../css/styles/style.css";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";

const BestSelling = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("Initializing Swiper");
    const swiper = new Swiper(".product-swiper", {
      modules: [Navigation, Pagination],
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  useEffect(() => {
    console.log("Initializing AOS");
    AOS.init();
  }, []);

  useEffect(() => {
    console.log("Fetching data");
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/homepage-data`);
        const data = await response.json();
        setItems(data.homePageBestSellingImages);
        console.log("Fetched homepage data:", data.homePageBestSellingImages); // Debugging log
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated items state:", items); // Log updated state
  }, [items]);

  return (
    <section
      id="best-sellers"
      className="best-sellers product-carousel py-5 position-relative overflow-hidden"
    >
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Best Selling Items</h4>
          <Link to="/outerwear" className="btn-link">
            View All Products
          </Link>
        </div>
        <div className="swiper product-swiper open-up" data-aos="zoom-out">
          <div className="swiper-wrapper d-flex" id="bestSellersList">
            {items.map((item, index) => (
              <div key={index} className="swiper-slide">
                <div className="product-item image-zoom-effect link-effect">
                  <div className="image-holder">
                    <Link to="/outerwear">
                      <img
                        src={`${API_URL}/${item.image}`}
                        alt={item.attribute}
                        className="product-image img-fluid"
                      />
                    </Link>

                    <div className="product-content">
                      <h5 className="text-uppercase fs-5 mt-3">
                        <Link to="/outerwear">{item.item}</Link>
                      </h5>
                      <p>{item.productDescription}</p>
                      <Link
                        to="/outerwear"
                        className="text-decoration-none"
                        data-after="View Product"
                      >
                        <span>${item.price}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="swiper-pagination"></div>

        <div className="icon-arrow icon-arrow-right">
          <div
            className="swiper-button-next"
            style={{ paddingRight: "30px" }}
          ></div>
        </div>

        <div className="icon-arrow icon-arrow-left">
          <div
            className="swiper-button-prev"
            style={{ paddingLeft: "30px" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
