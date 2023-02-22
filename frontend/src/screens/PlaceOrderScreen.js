import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { setCartFromCookie, placeOrder } from '../reducers/cartReducer';



function PlaceOrderScreen(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems, shipping, payment} = useSelector(state => state.cart);
    
    let token = null;
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.cart.order);

    const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {
        token = user.userInfo[0].token;
        const args = {
            cartItems, shipping, payment, 
            itemsPrice, shippingPrice, taxPrice, 
            totalPrice, token 
        }
        dispatch(placeOrder(args));
    }

    useEffect(() => {
        if (!shipping.address){
            navigate("/shipping");
        } else if (!payment.paymentMethod) {
            navigate("/payment");
        }
        if (cartItems.length === 0 && localStorage.getItem('cart')) {
            dispatch(setCartFromCookie(JSON.parse(localStorage.getItem('cart'))));
        }
    }, [])
    useEffect(() => {
        if (order.order){
            navigate(`/orders/${order.order._id}`)
        }
    }, [order])

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>
                        Shipping
                    </h3>
                    <div>
                        {shipping.fullName},
                        {shipping.address}, {shipping.city},
                        {shipping.postalCode}, {shipping.country},
                    </div>
                    <br/>
                    <div>
                        <Link to="/shipping">edit</Link>
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {payment.paymentMethod}
                    </div>
                    <br/>
                    <div>
                        <Link to="/payment">edit</Link>
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
                        {cartItems.length === 0 ?
                        <div>
                            Cart is empty
                        </div>
                        :
                        cartItems.map(item => 
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
                        <br/>
                        <div>
                            <Link to="/cart">edit</Link>
                        </div> 
                    </ul> 
                </div>
            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
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