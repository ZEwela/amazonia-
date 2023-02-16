import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, addQuantity, substractQuantity } from "../reducers/cartReducer";


function CartScreen(props){
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
                Subtotal ({subtotal}  items)
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