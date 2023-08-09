import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
