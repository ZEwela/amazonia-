import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, fetchProducts, deleteProduct } from "../reducers/productReducer";





function ProductsScreen(props) {
    const [modelVisible, setModelVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');

    const userInfo = useSelector(state => state.user.userInfo);
    const productList = useSelector(state => state.productList);
    const {loading,error, products,
        loadingCreate, errorCreate, successCreate, 
        loadingDelete, errorDelete, successDelete,
    } = productList;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (successCreate) {
            setModelVisible(false);
        }
        dispatch(fetchProducts());
        return () => {
        };
    },[successCreate, successDelete])

    const openModel = (product) => {
        setModelVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setDescription(product.description);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const token = userInfo[0].token;
        const product = {id, name, price, image, brand, category, countInStock, description};

        dispatch(createProduct({token: token, product: product}));
    }
    const deleteHandler = (id) => {
        const token = userInfo[0].token;
        dispatch(deleteProduct({token: token, productId: id}));
    }


    return <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={() => openModel({})}>Create Product</button>
        </div>
        {modelVisible && 
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container productCreate">
                        <li>
                            <h2>{id?"Edit Product":"Create Product"}</h2>
                        </li>
                        <li>
                            {loadingCreate && <div>Loading...</div>}
                            {errorCreate && <div>{error}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="price">
                                Price
                            </label>
                            <input type="price" name="price" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="image">
                                Image
                            </label>
                            <input  name="image" id="image" value={image} onChange={(e)=>setImage(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="brand">
                                Brand
                            </label>
                            <input type="brand" name="brand" id="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="category">
                                Category
                            </label>
                            <input type="category" name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="description">
                                Description
                            </label>
                            <textarea name="description" id="description"  value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </li>
                        <li>
                            <label htmlFor="countInStock">
                                Count In Stock
                            </label>
                            <input type="countInStock" name="countInStock" id="countInStock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}/>
                        </li>
                        <li>
                            <button type="submit" className="button primary">{id?"Edit":"Create"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={()=>setModelVisible(false)} className="button secondary">Back</button>
                        </li>
                    </ul>
                </form>
            </div> 
        }
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.action}</td>
                            <td>
                                <button className="button" onClick={()=>openModel(product)}>Edit</button>
                                {' '}
                                <button className="button" onClick={()=>deleteHandler(product._id)}>Delete</button>
                            </td>
                        </tr> 
                    ))} 
                </tbody>
            </table>
        </div>
</div>
}

export default ProductsScreen;