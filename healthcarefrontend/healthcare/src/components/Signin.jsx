import React, { useState } from 'react';
import './signcss.css'; // Import the CSS file
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signin() {
    const [isSignUpMode, setIsSignUpMode] = useState(false); // State to track sign-up mode
const navigate = useNavigate()
    const toggleMode = () => {
        setIsSignUpMode(prevMode => !prevMode);
    };
const [username, setUsername] = useState('')
const [firstname, setFirstname] = useState('')
const [lastname, setLastname] = useState('')
const [password, setPassword] = useState('')
    return (
        <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form  className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" onChange={(e)=>{
                                setUsername(e.target.value)
                            }}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
                        </div>
                        <button className='bg-[#F86F03] px-3 py-2 text-white rounded-md '
                        onClick={(e)=> {
                            let data = {
                                username: username,
                                password: password
                            }
                            let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: 'http://localhost:3100/user/signin',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data
                            };
                            axios.request(config)
                                .then((response) => {
                                    if (response.status === 200){
                                        navigate('/userdashboard')
                                    }
                                })
                                .catch((error) => {

                                    alert(error.response.data.msg)})
                        }}
                        >Signin</button>

                    </form>
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up for User</h2>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="text/email" placeholder="Username/Email" onChange={(e)=>{
                                setUsername(e.target.value)
                            }}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="First Name" onChange={(e)=>{
                                setFirstname(e.target.value)
                            }}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Last Name" onChange={(e)=>{
                                setLastname(e.target.value)
                            }}/>
                        </div>

                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
                        </div>

                        <button  className='bg-[#F86F03] px-3 py-2 text-white rounded-md '
                        onClick={(e)=>{
                            let data = {
                                username:username,
                                firstname:firstname,
                                lastname:lastname,
                                password:password
                            }
                            let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: 'http://localhost:3100/user/signup',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data : data
                            };

                            axios.request(config)
                                .then((response) => {
                                   if (response.status === 200){
                                       navigate('/userdashboard')
                                   }
                                })
                                .catch((error) => {

                                        alert(error.response.data.msg)

                                });

                        }}
                        >SignUp</button>

                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New to our Platform ?</h3>
                        <p>
                            "Every step forward is a victory, every obstacle overcome a testament to courage."

                        </p>
                        <button className="btn transparent" onClick={toggleMode} id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt=""/>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of Our Valued Members</h3>
                        <p>
                            Thank you for being part of our community. Your presence enriches our
                            shared experiences. Let's continue this journey together!
                        </p>
                        <button className="btn transparent" onClick={toggleMode} id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Signin;
