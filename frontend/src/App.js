import { React, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromCookie, signout } from './reducers/userReducer';

function App() {
  const dispatch = useDispatch();
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  
  const userInfo = useSelector(state => state.user.userInfo);

  useEffect(() => {
    if (userInfo.length === 0 && localStorage.getItem('user')) {
        dispatch(setUserFromCookie(JSON.parse(localStorage.getItem('user'))));
    }
  }, []);

  const signoutHandler = () => {
    dispatch(signout())
  }

  const isAdmin = (userInfo.length > 0 && userInfo[0].isAdmin === true) ? true : false;

  return (
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/">amazonia</Link>
                </div>
                <div className="header-links">
                    {
                        isAdmin && <Link to="/products">Products</Link>
                    }
                    <Link to="/cart">Cart</Link>
                    {
                        userInfo.length > 0 ? 
                        <>
                        <Link to="/profile">{userInfo[0].name}</Link>
                        <Link onClick={signoutHandler}>Sign-out</Link>
                        </>
                        :
                        <Link to="/signin">Sign-In</Link>
                    }
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>
                    x
                </button>
                <ul>
                    <li><a href="index.html">Pants</a></li>
                    <li><a href="index.html">Shirts</a></li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <Routes>
                        <Route path="/shipping" element={<ShippingScreen/>}/>
                        <Route path="/payment" element={<PaymentScreen/>}/>
                        <Route path="/placeOrder" element={<PlaceOrderScreen/>}/>
                        <Route path="/products" element={<ProductsScreen/>}/>
                        <Route path="/register" element={<RegisterScreen/>}/>
                        <Route path="/signin" element={<SigninScreen/>} />
                        <Route path="/products/:id" element={<ProductScreen/>} />
                        <Route path="/cart/:id?" element={<CartScreen/>} />
                        <Route path="/" exact={true} element={<HomeScreen/>} />   
                    </Routes>
                </div>
            </main>
            <footer className="footer">
                All right reserved.
            </footer>
        </div>
  );
}

export default App;
