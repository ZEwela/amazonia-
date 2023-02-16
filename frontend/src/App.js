import {React, useEffect} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setCartFromCookie } from './reducers/cartReducer';
import {setUserFromCookie} from './reducers/userReducer';



function App() {
  const dispatch = useDispatch();
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  
  const userInfo = useSelector(state => state.user.userInfo);
  const cartItems = useSelector(state => state.cart.cartItems);
  const [cookies, setCookie] = useCookies(['cart', 'user']);


  useEffect(() => {
    if (cartItems.length === 0 && cookies.cart !== undefined) {
        if (cookies.cart) {return}
        dispatch(setCartFromCookie(cookies.cart))
    } else {
        setCookie('cart', cartItems, {path: '/', maxAge: 86400});
    }
  }, [cartItems]);

  useEffect(() => {
    if (userInfo.length === 0  &&  cookies.user !== undefined) {
        dispatch(setUserFromCookie(cookies.user))
    } else {
        setCookie('user', userInfo, {path: '/', maxAge: 86400});
    }
  }, [userInfo]);

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
                    <Link to="/cart">Cart</Link>
                    {
                        userInfo.length > 0 ? <Link to="/profile">{userInfo[0].name}</Link> 
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
