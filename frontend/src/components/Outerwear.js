import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/styles/style.css"; // Ensure you have the necessary CSS files
import AOS from "aos";
import "aos/dist/aos.css";


const Outerwear = () => {
  const [outerwearItems, setOuterwearItems] = useState([]);

  useEffect(() => {
    console.log("Initializing AOS");
    AOS.init();
  }, []);

  useEffect(() => {
    console.log("Fetching data");

    const fetchData = async () => {
        try{
            const response = await fetch("http://localhost:8080/outerwear-data");
            const data = await response.json();
            setOuterwearItems(data.OuterwearPageShop);
            console.log("Fetched outerwear data", data.OuterwearPageShop);
        } catch (error) {
            console.error("Error fetching outerwear data:", error);
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated items state:", outerwearItems); // Log updated state
  }, [outerwearItems]);

  return (
    <section className="categories overflow-hidden">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Outerwear</h4>
        </div>
        <div className="row" id="outerwearList">
          {outerwearItems.map((element, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="swiper-slide">
                <div className="product-item image-zoom-effect link-effect">
                  <div className="image-holder position-relative">
                    <Link to="/outerwear">
                      <img
                        src={element.image}
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
                    <a href="#" className="text-decoration-none" data-after="Add to cart">
                      <span>${element.price}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outerwear;