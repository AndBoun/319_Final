import React from "react";
import Navbar from "./components/Navbar";
import BestSelling from "./components/BestSelling";
import MainPicture from "./components/MainPicture";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Navbar />
      <MainPicture />
      <BestSelling />
      <Footer />
    </div>
  );
}

export default App;
