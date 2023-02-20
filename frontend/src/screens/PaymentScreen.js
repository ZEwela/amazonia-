import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../reducers/cartReducer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";


function PaymentScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod: paymentMethod}));
        navigate("/placeorder");
    }


    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Payment</h2>
                    </li>
                    <li>
                        <div>
                            <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" required onChange={(e) => setPaymentMethod(e.target.value)}/>
                            <label htmlFor="paymentMethod">
                                Paypal
                            </label>
                        </div>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>  
}

export default PaymentScreen;