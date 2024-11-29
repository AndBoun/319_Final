import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/normalize.css";
// import "../css/sign-in.css";
// import "../css/swiper-bundle.min.css";
// import "../css/vendor.css";
// import "../css/styles/style.css";

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

  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/homepage-data");
        const data = await response.json();
        setItems(data.homePageBestSellingImages);
        console.log("Fetched homepage data:", data.homePageBestSellingImages); // Debugging log
        console.log(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      id="best-sellers"
      className="best-sellers product-carousel py-5 position-relative overflow-hidden"
    >
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Best Selling Items</h4>
          <a href="/outerwear" className="btn-link">
            View All Products
          </a>
        </div>
        <div className="swiper product-swiper open-up" data-aos="zoom-out">
          <div className="swiper-wrapper d-flex" id="bestSellersList">
            {items.map((item, index) => (
              <div key={index} className="swiper-slide">
                <div className="product-item image-zoom-effect link-effect">
                  <div className="image-holder">
                    
                    {/* TODO */}
                    <a href="/outerwear">
                      <img
                        src={item.image}
                        alt={item.attribute}
                        className="product-image img-fluid"
                      />
                    </a>

                    <div className="product-content">
                      <h5 className="text-uppercase fs-5 mt-3">
                        <a href="/outerwear">{item.item}</a>
                      </h5>
                      <p>{item.productDescription}</p>
                      <a
                        href="/"
                        className="text-decoration-none"
                        data-after="Add to cart"
                      >
                        <span>${item.price}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default BestSelling;
