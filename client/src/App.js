import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  Home,
  ProductList,
  Product,
  Register,
  Login,
  Cart,
  Success
} from "./pages/index";

import { Navbar, Footer } from "./components/index"

function App() {
  const user = useSelector((state) => state.user.currentUser)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login"element={<Login /> } />
        <Route path="/register" element={<Register /> } />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
