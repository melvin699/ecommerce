import React from 'react';
import './Css/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-heading">About PricePulse</h2>
      <p className="about-text">Welcome to PricePulse, your go-to destination for finding the best deals and comparing prices across a wide range of products. At PricePulse, we believe in making informed buying decisions, and we're here to help you do just that.</p>
      
      <div className="about-section">
        <h3>Our Mission</h3>
        <p>Our mission at PricePulse is simple: to empower consumers with the information they need to shop smartly and save money. We understand that the marketplace can be overwhelming, with countless options and fluctuating prices. That's why we've created PricePulse – to streamline your shopping experience and ensure you get the best value for your money.</p>
      </div>
      
      <div className="about-section">
        <h3>What We Offer</h3>
        <ul>
          <li><strong>Price Comparison:</strong> With PricePulse, you can compare prices from various retailers and platforms, allowing you to find the best deals without the hassle of visiting multiple websites.</li>
          <li><strong>Product Reviews:</strong> We provide unbiased product reviews and ratings to help you make informed decisions. Our team meticulously researches and analyzes products to give you honest and reliable information.</li>
          <li><strong>Deal Alerts:</strong> Stay updated on the latest deals and discounts with our deal alerts feature. Simply set your preferences, and we'll notify you when prices drop or when new deals become available.</li>
        </ul>
      </div>
      
      <div className="about-section">
        <h3>Why Choose PricePulse?</h3>
        <ul>
          <li><strong>Transparency:</strong> We believe in transparency and integrity. You can trust PricePulse to provide accurate and up-to-date information, so you can shop with confidence.</li>
          <li><strong>User-Friendly Interface:</strong> Our website is designed with the user in mind. Navigating through products and deals is easy and intuitive, ensuring a seamless shopping experience.</li>
          <li><strong>Community-driven:</strong> PricePulse is more than just a website – it's a community of savvy shoppers helping each other save money. Join our community forums, share your insights, and discover hidden gems together.</li>
        </ul>
      </div>
      
      <div className="about-section">
        <h3>Get Started Today!</h3>
        <p>Ready to start saving money and making smarter buying decisions? Explore PricePulse today and join thousands of shoppers who rely on us for the best deals and price comparisons.</p>
      </div>
    </div>
  );
}

export default About;
