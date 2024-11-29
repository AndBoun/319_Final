import React, { useEffect, useState } from "react";

const MainPicture = () => {
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchMainImage = async () => {
      try {
        const response = await fetch("http://localhost:8080/homepage-data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched homepage data:", data); // Debugging log
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
                    src={mainImage.image}
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

  // return (
  //   <div>
  //     {mainImage ? (
  //       <div className="video-image img-fluid">
  //         <img
  //           src={mainImage.image}
  //           alt={mainImage.attribute || "Image"}
  //           className="video-image img-fluid"
  //         />
  //       </div>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );


};

export default MainPicture;
