import {React, useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useParams, Link} from "react-router-dom";
import queryString from "query-string";
import { addToCart, removeFromCart, addQuantity, substractQuantity} from "../reducers/cartReducer";
import { useCookies } from 'react-cookie';

function CartScreen(props){
    // const {id} = useParams();
    // const queryParams = queryString.parse(window.location.search);
    // const qty = Number(queryParams.qty);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;


    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const addQuantityHandler = (productId) => {
        dispatch(addQuantity(productId));
    }
    const substractQuantityHandler = (productId, qty) => {
        if (qty > 1) {
            dispatch(substractQuantity(productId));
        } else {
            dispatch(removeFromCart(productId));
        }
    }

    // useEffect(()=> {
    //     // const args = {id, qty};
    //     dispatch(addToCart(cookie.cart));
    // }, [])



    return <div className="cart">
        <div className="cart-list">
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
                                <Link to={`/api/product/${item.product}`}>
                                    {item.name}
                                </Link>
                            </div>
                            <div>
                                Qty: {item.qty}
                                <button type="button" className="button-add" onClick={() => addQuantityHandler(item.product)}>
                                    +
                                </button>
                                <button type="button" className="button-substract" onClick={() => substractQuantityHandler(item.product, item.qty)}>
                                    -
                                </button>
                                <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                    Delete
                                </button>
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
        <div className="cart-action">
            <h3>
                Subtotal ({cartItems.reduce((a,c) => a + c.qty, 0)}  items)
                :
                $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
            </h3>
            <button className="button primary" disabled={cartItems.length === 0 }>
                Proceed to Checkout
            </button>
        </div>
    </div>
}

export default CartScreen;