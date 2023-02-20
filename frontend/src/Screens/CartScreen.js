import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addQuantity, substractQuantity, setCartFromCookie } from "../reducers/cartReducer";


function CartScreen(props){
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const userInfo = useSelector(state => state.user.userInfo); 
    const navigate = useNavigate();
    
    useEffect(() => {
        if (cartItems.length === 0 && localStorage.getItem('cart')) {
            dispatch(setCartFromCookie(JSON.parse(localStorage.getItem('cart'))));
        }
    }, [])
   
    const checkoutHandler = () => {
        if (userInfo.length === 0) {
            navigate("/signin?redirect=shipping");
        } else {
            navigate("/shipping");
        }

    }

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const addQuantityHandler = (productId) => {
        dispatch(addQuantity(productId));
    }
    const substractQuantityHandler = (productId, qty) => {
        if (qty === 1) {
            dispatch(removeFromCart(productId)); 
        } else {
            dispatch(substractQuantity(productId));  

        }
    }

    const subtotal = cartItems.reduce((a,c) => a + Number(c.qty), 0)

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
                                <Link to={`/products/${item.product}`}>
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
                Subtotal ({subtotal}  items)
                :
                $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
            </h3>
            <button className="button primary" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
            </button>
        </div>
    </div>
}

export default CartScreen;