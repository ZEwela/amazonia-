import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';



function ProductScreen(props) {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state?.product;

    // const [products, setProducts] = useState([]);
    // const [error, setError] = useState();

    if (product === undefined) {

        return <div>Product not found</div>
    }

    return <div>
        <div className='back-to-result'>
            <Link to="/">Back to result</Link>
        </div>
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
                        Status: {product.status}
                    </li>
                    <li>
                        Qty: <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </li>
                    <li>
                        <button className="button primary">Add to cart</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default ProductScreen;