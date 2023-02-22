import { React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../reducers/orderReducer";
import { setUserFromCookie } from "../reducers/userReducer";


function OrderScreen(props){
    const orderId = useParams().id;
    const dispatch = useDispatch();
    const {loading, error, orderInfo} = useSelector(state => state.order);


    useEffect(() => {
        dispatch(getOrder({ orderId}));  
    }, []); 

    return (

        loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
        <div>
        <h3>Order {orderInfo._id}</h3>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>
                        Shipping
                    </h3>
                    <div>
                        {orderInfo.shippingAddress.fullName},
                        {orderInfo.shippingAddress.address}, {orderInfo.shippingAddress.city},
                        {orderInfo.shippingAddress.postalCode}, {orderInfo.shippingAddress.country},
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {orderInfo.paymentMethod}
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
                        {orderInfo.orderItems.map(item => 
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
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${orderInfo.itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${orderInfo.shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${orderInfo.taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${orderInfo.totalPrice}</div>
                    </li>
                </ul> 
            </div>
        </div>
    </div> 
)}

export default OrderScreen;