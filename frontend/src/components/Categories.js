import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from '../config';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/normalize.css";
import "../css/vendor.css";
import "../css/styles/style.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        console.log("Fetched categories data", data);
        if (data && data.length > 0) {
          setCategories(Array.isArray(data[0].Categories) ? data[0].Categories : []);
          console.log("Fetched categories data", data[0].Categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="categories-section py-5 position-relative overflow-hidden">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">Shop By Category</h4>
        </div>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-md-6">
              <div className="category-item image-zoom-effect link-effect">
                <div className="image-holder" style={{ position: "relative" }}>
                  <Link to={category.link}>
                    <div
                      className="image-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        backdropFilter: "blur(1.5px)",
                        zIndex: 1,
                      }}
                    ></div>
                    <img
                      src={`${API_URL}/${category.image}`}
                      alt={category.title}
                      className="img-fluid w-100"
                      style={{ filter: "brightness(0.9)" }}
                    />
                    <div
                      className="category-content position-absolute top-50 start-50 translate-middle text-center"
                      style={{ zIndex: 2 }}
                    >
                      <h2
                        className="text-white text-uppercase"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                      >
                        {category.title}
                      </h2>
                      <span className="btn btn-light text-uppercase">
                        Shop Now
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
