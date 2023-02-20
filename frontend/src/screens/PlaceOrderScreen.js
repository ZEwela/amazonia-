import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { setCartFromCookie } from '../reducers/cartReducer';



function PlaceOrderScreen(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    const itemsPrice = cart.cartItems.reduce((a,c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {

    }

    useEffect(() => {
        if (!cart.shipping.address){
            navigate("/shipping");
        } else if (!cart.payment.paymentMethod) {
            navigate("/payment");
        }
        if (cart.cartItems.length === 0 && localStorage.getItem('cart')) {
            dispatch(setCartFromCookie(JSON.parse(localStorage.getItem('cart'))));
        }
    }, [])

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>
                        Shipping
                    </h3>
                    <div>
                        {cart.shipping.address}, {cart.shipping.city},
                        {cart.shipping.postalCode}, {cart.shipping.country},
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {cart.payment.paymentMethod}
                    </div>
                </div> 
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>
                                Shopping Cart
                            </h3>
                            <div>
                                Price
                            </div>
                        </li>
                        {cart.cartItems.length === 0 ?
                        <div>
                            Cart is empty
                        </div>
                        :
                        cart.cartItems.map(item => 
                            <li key={item.product}>
                                <div className="cart-image">
                                    <img src={item.image} alt={item.name}/>
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty: {item.qty}
                                    </div>
                                </div>
                                <div className="cart-price">
                                        ${item.price}
                                </div>
                            </li>
                            )
                         } 
                    </ul> 
                </div>
            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button className="button primary full-width" onClick={placeOrderHandler}>PlaceOrder</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${totalPrice}</div>
                    </li>
                </ul> 
            </div>
        </div>
    </div>
}

export default PlaceOrderScreen;