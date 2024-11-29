import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const BestSelling = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/homepage-data');
        const data = await response.json();
        setItems(data.homePageBestSellingImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="best-sellers" className="best-sellers product-carousel py-5 position-relative overflow-hidden">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Best Selling Items</h4>
          <a href="/outerwear" className="btn-link">View All Products</a>
        </div>
        <div className="swiper product-swiper open-up" data-aos="zoom-out">
          <div className="swiper-wrapper d-flex" id="bestSellersList">
            {items.map((item, index) => (
              <div key={index} className="swiper-slide">
                <div className="product-item image-zoom-effect link-effect">
                  <div className="image-holder">
                    <a href="/outerwear">
                      <img src={item.image} alt={item.attribute} className="product-image img-fluid" />
                    </a>
                    <a href="/outerwear" className="btn-icon btn-wishlist">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use xlinkHref="#heart"></use>
                      </svg>
                    </a>
                    <div className="product-content">
                      <h5 className="text-uppercase fs-5 mt-3">
                        <a href="/outerwear">{item.item}</a>
                      </h5>
                      <p>{item.productDescription}</p>
                      <a href="/" className="text-decoration-none" data-after="Add to cart"><span>${item.price}</span></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="icon-arrow icon-arrow-left">
          <svg width="50" height="50" viewBox="0 0 24 24">
            <use xlinkHref="#arrow-left"></use>
          </svg>
        </div>
        <div className="icon-arrow icon-arrow-right">
          <svg width="50" height="50" viewBox="0 0 24 24">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;