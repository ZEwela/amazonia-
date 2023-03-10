import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../reducers/userReducer";

function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const user = useSelector(state => state.user);
    const {loading, error, userInfo} = user;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search?location.search.split("=")[1]:'/'; 

    useEffect(() => {
        if (userInfo.length > 0){
            navigate(`/${redirect}`);
        }
        return () => {
        };
    },[userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register({name, email, password}))
    }


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" minLength="8" maxLength="34" required onChange={(e)=>setPassword(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="rePassword">
                        Re-enter Password
                    </label>
                    <input type="password" name="rePassword" id="rePassword" minLength="8" maxLength="34" required onChange={(e)=>setRePassword(e.target.value)}/>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have amazonia account?
                </li>
                <li>
                    <Link to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect} className="button secondary text-center">Sign-in</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;