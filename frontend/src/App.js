import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BestSelling from "./components/BestSelling";
import MainPicture from "./components/MainPicture";
import Footer from "./components/Footer";
import Kai from "./components/Kai";
import Andrew from "./components/Andrew";
import ContactUs from "./components/ContactUs";
import Outerwear from "./components/Outerwear";
import Pants from "./components/Pants";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPicture />
                <BestSelling />
              </>
            }
          />
          <Route path="/kai" element={<Kai />} />
          <Route path="/andrew" element={<Andrew />} />

          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/outerwear" element={<Outerwear />} />
          <Route path="/pants" element={<Pants />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;