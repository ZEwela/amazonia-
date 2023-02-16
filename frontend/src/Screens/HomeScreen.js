import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducers/productReducer';

function HomeScreen(props) {

    const productList = useSelector(state => state.productList)
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        
        return () => {

        };
    }, [])

    return (
        loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
        <ul className="products">
            {
                products.map(product =>
                    <li key={product._id}>
                        <div className="product">
                            <img  className="product-image" src={product.image} alt="product"/>
                            <div className="product-name">
                                <Link to={`/products/${product._id}`}>{product.name}</Link>
                            </div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                        </div>
                    </li>
                )
            }
        </ul>
    )
}

export default HomeScreen;