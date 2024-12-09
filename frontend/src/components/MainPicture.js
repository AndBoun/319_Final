import React, { useEffect, useState } from "react";
import { API_URL } from '../config';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/normalize.css";
import "../css/sign-in.css";
import "../css/swiper-bundle.min.css";
import "../css/vendor.css";
import "../css/styles/style.css";

import AOS from "aos";
import "aos/dist/aos.css";


const MainPicture = () => {
  const [mainImage, setMainImage] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchMainImage = async () => {
      try {
        const response = await fetch(`${API_URL}/homepage-data`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched homeMainPicture data:", data); // Debugging log
        setMainImage(data.homePageMainImage); // Assuming "homePageMainImage" is the field name in MongoDB
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMainImage();
  }, []);

  return (
    <section className="video py-5 overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="video-content open-up" data-aos="zoom-out">
            <div className="video-bg" id="main-background">
              {mainImage ? (
                <div className="video-image img-fluid">
                  <img
                    src={`${API_URL}/${mainImage.image}`}
                    alt={mainImage.attribute || "Image"}
                    className="video-image img-fluid"
                  />
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPicture;
