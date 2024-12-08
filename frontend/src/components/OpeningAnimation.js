import React, { useState, useEffect } from "react";
import "../css/styles/style.css";

const OpeningAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${isLoaded ? 'loaded' : ''}`}>
    </div>
  );
};

export default OpeningAnimation;
