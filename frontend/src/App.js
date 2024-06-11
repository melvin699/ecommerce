import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart'
import ComparisonPage from './Components/ComparisonPage/ComparisonPage';
import men_banner from './Components/Images/mens-banner.jpg'
import women_banner from './Components/Images/women fashion banner 2.png'
import kids_banner from './Components/Images/kids-banner.jpg'
import electonics_banner from './Components/Images/electronics-banner.png'
import utensils_banner from './Components/Images/kitch.jpg'
import MpesaPayment from './Components/PaymentOptions/PaymentOptions';
import About from './Pages/About';
import Contact from './Pages/Contact';
import MessageList from './Components/Messages/Messages';
import Messages from './Components/Messages/Messages';
// import { useState } from 'react';
// import Paypal from './Components/Paypal';
function App() {
// const [checkout, setCheckOut] = useState (false)
  return (
    // <div className='App'>
    //   {checkout ?(
    //     <Paypal />
    //   ) : (
    //   <button
    //   onClick={()=> {
    //   setCheckOut(true);
    // }}
    //   >
    //    Checkout
    //   </button>
    //   )}
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path= '/about' element ={<About/>}/>
        <Route path= '/contact' element ={<Contact us/>}/>
        <Route path='/MEN' element = {<ShopCategory banner={men_banner} category="men clothing"/>} />
        <Route path='/WOMEN' element = {<ShopCategory banner={women_banner}category="womens clothing"/>}/>
        <Route path='/KIDS' element = {<ShopCategory banner={kids_banner}category="KIDS"/>}/>
        <Route path='/ELECTRONICS' element={<ShopCategory banner={electonics_banner}category="ELECTRONICS" />} />
        <Route path='/UTENSILS' element={<ShopCategory banner={utensils_banner}category="UTENSILS" />} />
        <Route path='/product' element= {<Product/>}>
        <Route path=':productId' element = {<Product/>}/>
        
        </Route>
        <Route path='/cart'  element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path ='/comparison' element = {<ComparisonPage/>}/>
        <Route path ='/comparison/:productType' element = {<ComparisonPage/>}/>
        <Route path="/mpesa-payment" component={MpesaPayment}/>
        <Route path = "/messages" element = {<Messages />}/>

      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
