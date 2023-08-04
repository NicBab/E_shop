import React from "react";
import {
  Navbar,
  Announcement,
  Slider,
  Categories,
  Products,
  Newsletter,
  Footer
} from "../components/index";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Slider />
      <Categories />
      <Products />
    </div>
  );
};

export default Home;
