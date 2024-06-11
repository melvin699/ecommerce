import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import cart_icon from '../Images/shopping_cart.png';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import open_menu from '../Images/dropdown.png';
import axios from 'axios';;



const Navbar = () => {
  const [menu, setMenu] = useState('HOME');
  const { getTotalCartItems } = useContext(Context);
  const [messageCount, setMessageCount] = useState(0); 


  const menuRef = useRef();
  // const [query, setQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = () => {
  //   fetch(`http://localhost:5000/search?query=${query}`)
  //     .then((response) => response.json())
  //     .then((data) => {
        
  //       setSearchResults(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error searching products:', error);
  //     });
  // };



  
  useEffect(() => {
    fetchMessageCount();
  }, []);

  const fetchMessageCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages/count'); 
      setMessageCount(response.data.count);
    } catch (error) {
      console.error('Error fetching message count:', error);
    }
  };


  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <p>PRICEPULSE</p>
        </div>
        {/* <div className="search">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              aria-label="Search products..."
              aria-describedby="basic-addon2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" className="btn btn-secondary">
              <span className="input-group-text" id="basic-addon2">
                <i className="fa fa-search"></i>
              </span>
              Search
            </button>
          </div>
        </div> */}
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token') ? (
            <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button>
          ) : (
            <Link to="/login"><button>Login</button></Link>
          )}
           
           <div className="message-icon">
          <Link to="/messages">
            <span className="icon"><i className="fa fa-envelope"></i></span>
            {messageCount > 0 && <span className="message-count">{messageCount}</span>}
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </div>

          <Link to="/cart"><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
      <div className="menu-items">
        <img className="open-menu" onClick={dropdown_toggle} src={open_menu} alt="" />
        <ul ref={menuRef} className="nav-menu">
          <li onClick={() => { setMenu('HOME'); }}><Link style={{ textDecoration: 'none' }} to="/">HOME</Link>{menu === 'SHOP' ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu('about'); }}> <Link style={{ textDecoration: 'none' }} to="/about">ABOUT</Link>{menu === 'about' ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu('contact'); }}> <Link style={{ textDecoration: 'none' }} to="/contact">Contact us</Link> {menu === 'contact' ? <hr /> : <></>}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
