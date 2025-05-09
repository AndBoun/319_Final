import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPicture from "./components/MainPicture";
import BestSelling from "./components/BestSelling";
import Kai from "./components/Kai";
import Andrew from "./components/Andrew";
import ContactUs from "./components/ContactUs";
import Outerwear from "./components/Outerwear";
import Pants from "./components/Pants";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Footer from "./components/Footer";
import AccountPage from "./components/AccountPage";
import CheckOut from "./components/CheckOut";
import OrderSummary from "./components/OrderSummary";
import ChatBot from "./components/ChatBot";
import AdminPage from "./components/AdminPage";
import Categories from "./components/Categories";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setTotal(total + item.price);
  };

  return (
    <Router>
      <div>
        <Navbar
          cartItems={cartItems}
          setCartItems={setCartItems}
          total={total}
          setTotal={setTotal}
        />
        <ChatBot />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainPicture />
                <BestSelling />
                <Categories />
              </>
            }
          />
          <Route path="/kai" element={<Kai />} />
          <Route path="/andrew" element={<Andrew />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route
            path="/outerwear"
            element={<Outerwear addToCart={addToCart} />}
          />
          <Route path="/pants" element={<Pants addToCart={addToCart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password" element={<ForgotPassword />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/checkout"
            element={<CheckOut formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/order-summary"
            element={
              <OrderSummary
                cartItems={cartItems}
                setCartItems={setCartItems}
                total={total}
                setTotal={setTotal}
                formData={formData}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
