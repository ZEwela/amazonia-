import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../reducers/cartReducer';
import {fetchProductById} from '../reducers/productReducer';
import { setCartFromCookie } from '../reducers/cartReducer';



function ProductScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const [qty, setQty] = useState(1);

    const productList = useSelector(state => state.productList);
    const cartItems = useSelector(state => state.cart.cartItems);

    const {product, loading, error} = productList;

    useEffect(() => {
        if (cartItems.length === 0 && localStorage.getItem('cart')) {
            dispatch(setCartFromCookie(JSON.parse(localStorage.getItem('cart'))));
        }
    }, [])

    const indexOfProductInCart = cartItems.findIndex(x => x.product === id);
    const amountToSell = indexOfProductInCart === -1 ? 
        product.countInStock
        :
        product.countInStock - cartItems[indexOfProductInCart].qty ;
  
    
    useEffect(() => {
        dispatch(fetchProductById(id));
        return () => {

        };
    },[])

    const maxQty = (qty) => {
        return (qty > 30)? 30:qty;
    } 

    const handleAddToCart = (id, qty) => {
        qty = Number(qty);
        dispatch(addToCart({id, qty}))
       navigate('/cart/');
    }

    return <div>
        <div className='back-to-result'>
            <Link to="/">Back to result</Link>
        </div>
   
        {loading? <div>Loading...</div>:
        error? <div>Product Not Found</div>: 
        (
            <div className='details'>
                <div className='details-image'>
                    <img src={product.image} alt={product.name}></img>
                </div>
                <div className='details-info'>
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Starts {product.numReviews} Reviews
                        </li>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>
                        <li>
                            Description:
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='details-action'>
                    <ul>
                        <li>
                            Price: ${product.price}
                        </li>
                        <li>
                            Status: {amountToSell > 0 ? "In Stock" : "Out of stock"}
                        </li>
                        {
                        (amountToSell > 0) && 
                        <>
                        <li>
                            Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                {[...Array(maxQty(amountToSell)).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                            </select>
                        </li>
                        <li>
                             <button onClick={() => handleAddToCart(product._id, qty)} className="button primary">Add to cart</button>
                        </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        )
        }
    </div>
}

export default ProductScreen;