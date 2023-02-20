import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from "../reducers/cartReducer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";


function ShippingScreen(props) {
    const shipping = useSelector(state => state.cart.shipping);
    const [fullName, setFullName] = useState(shipping.fullName || '');
    const [address, setAddress] = useState(shipping.address || '');
    const [city, setCity] = useState(shipping.city || '');
    const [postalCode, setPostalCode] = useState(shipping.postalCode || '');
    const [country, setCountry] = useState(shipping.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({fullName, address, city, postalCode, country}));
        navigate("/payment");
    }


    return <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>
                    <li>
                        <label htmlFor="fullname">
                            Name and Surname
                        </label>
                        <input type="text" name="fullname" id="fullname" value={fullName || ''} required onChange={(e) => setFullName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Address
                        </label>
                        <input type="text" name="address" id="address" value={address || ''} required onChange={(e) => setAddress(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" name="city" id="city" value={city || ''} required onChange={(e) => setCity(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="postalCode">
                            Postal Code
                        </label>
                        <input type="text" name="postalCode" id="postalCode" value={postalCode || ''} required onChange={(e) => setPostalCode(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="country">
                            Country
                        </label>
                        <input type="text" name="country" id="country" value={country || ''} required onChange={(e) => setCountry(e.target.value)}/>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>  
}

export default ShippingScreen;