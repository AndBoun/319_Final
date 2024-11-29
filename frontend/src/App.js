import React from "react";
import Navbar from "./components/Navbar";
import BestSelling from "./components/BestSelling";
import MainPicture from "./components/MainPicture";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainPicture />
      <BestSelling />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
