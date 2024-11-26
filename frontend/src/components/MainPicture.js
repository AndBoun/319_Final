import React, { useEffect, useState } from 'react';

const MainPicture = () => {
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setMainImage(data.homePageMainImage))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="video py-5 overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="video-content open-up" data-aos="zoom-out">
            <div className="video-bg" id="main-background">
              {mainImage && (
                <div className="video-image img-fluid">
                  <img src={mainImage.image} alt={mainImage.attribute} className="video-image img-fluid" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPicture;