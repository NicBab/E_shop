import React from "react";
import {
  Announcement,
  Slider,
  Categories,
  Products,
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
