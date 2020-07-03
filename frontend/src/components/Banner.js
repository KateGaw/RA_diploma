import React from "react";
import banner_img from "../img/banner.jpg";

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner_img} className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header"> К весне готовы! </h2>{" "}
    </div>
  );
};

export default Banner;
