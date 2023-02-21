import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signin } from "../reducers/userReducer";

function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.user);
    const {loading, error, userInfo} = user;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search?location.search.split("=")[1]:''; 
    useEffect(() => {
        if (userInfo.length > 0){
            navigate(`/${redirect}`);
        }
        return () => {
        };
    },[userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({email, password}))
    }


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign in</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </li>
                <li>
                     <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" minLength="8" maxLength="34" onChange={(e)=>setPassword(e.target.value)}/>
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    New to amazonia?
                </li>
                <li>
                    <Link to={redirect === "/" ? "/register" : "/register?redirect=" + redirect} className="button secondary text-center">Create your amazonia account</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default SigninScreen;