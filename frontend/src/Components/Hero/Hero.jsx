import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import main_banner from '../Images/mainbanner.jpg';
import electronics_img from '../Images/electronics.jpg';
import kids_img from '../Images/Kidsclothing.jpg';
import utensil_img from '../Images/utensil-logo.jpg';
import women_img from '../Images/womenclothes.jpg';
import men_img from '../Images/menclothes.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="main-banner">
          <img src={main_banner} alt="Special Offers" />
          <div className="main-banner-text">
            <h1>Special Offers</h1>
            <p>Don't miss out</p>
            <Link to="/special-offers" className="btn">
              BUY NOW
            </Link>
          </div>
        </div>

        <div className="small-banners">
          <Link to="/MEN" className="small-banner">
            <img src={men_img} alt="Men" />
            <div className="small-banner-text">
              <h2>Men</h2>
            </div>
          </Link>

          <Link to="/WOMEN" className="small-banner">
            <img src={women_img} alt="Women" />
            <div className="small-banner-text">
              <h2>Women</h2>
            </div>
          </Link>

          <Link to="/UTENSILS" className="small-banner">
            <img src={utensil_img} alt="Kitchen Appliances" />
            <div className="small-banner-text">
              <h2>Kitchen Appliances</h2>
            </div>
          </Link>

          <Link to="/ELECTRONICS" className="small-banner">
            <img src={electronics_img} alt="Electronics" />
            <div className="small-banner-text">
              <h2>Electronics</h2>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
