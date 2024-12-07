import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/styles/style.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Pants = () => {
    const [pantsItems, setPantsItems] = useState([]);

    useEffect(() => {
        console.log("Initializing AOS");
        AOS.init();
    }, []);

    useEffect(() => {
        console.log("Fetching data");

        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/pants-data");
                const data = await response.json();
                if (data && data.length > 0) {
                    setPantsItems(data[0].PantsPageShop);
                    console.log("Fetched pants data", data[0].PantsPageShop);
                }
            } catch (error) {
                console.error("Error fetching pants data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Updated items state:", pantsItems);
    }, [pantsItems]);

    return (
        <section className="categories overflow-hidden">
            <div className="container">
                <div className= "d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
                    <h4 className="text-uppercase">Pants</h4>
                </div>
            <div className="row" id="pantsList">
                {pantsItems.length > 0 ? (
                    pantsItems.map((element, index) => (
                        <div key={index} className="col-md-6 col-lg-4 mb-4">
                            <div className="swiper-slide">
                                <div className="product-item image-zoom-effect link-effect">
                                    <div className="image-holder position-relative">
                                        <Link to="/pants">
                                            <img
                                                src={element.image}
                                                alt={element.attribute}
                                                className="product-image img-fluid"
                                            />
                                        </Link>
                                        <Link to="/pants" className="btn-icon btn-wishlist">
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <use xlinkHref="#heart"></use>
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h5 className="element-title text-uppercase fs-5 mt-3">
                                            <Link to="/pants">{element.name}</Link>
                                        </h5>
                                        <p> {element.productDescription}</p>
                                        <a href="#" className="text-decoration-none" data-after="Add to cart">
                                            <span>${element.price}</span>
                                        </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))
                    ) : (
                        <div className="col-12">
                            <h5 className="text-center">No pants found</h5>
                        </div>
                    )}
                    </div>
                    </div>
        </section>
    );
}

export default Pants;