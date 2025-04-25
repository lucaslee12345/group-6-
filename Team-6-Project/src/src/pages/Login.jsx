import React, { useState } from "react";

import '../css/Login.css';
import icon from '../img/Person-icon.jpg';

function Login({ setPage }) {
    const [register, setRegister] = useState(false);

    const [typedUser, setTypedUser] = useState("");
    const [typedMail, setTypedMail] = useState("");
    const [typedPass, setTypedPass] = useState("");
    const [typedPassAgain, setTypedPassAgain] = useState("");

    const clearField = () => {
        setTypedMail("");
        setTypedUser("");
        setTypedPass("");
        setTypedPassAgain("");
    }

    return (
        <>
            {!register && (
                <div>
                    <div className="topDivContainer">
                        <img id="icon" src={icon} alt="user icon"/>
                        <p>Log in</p>
                    </div>

                    <div className="inputRow">
                        <p>Username:</p>
                        <input 
                            value={typedUser}
                            onChange={(e) => setTypedUser(e.target.value)}
                        />
                    </div>

                    <div className="inputRow">
                        <p>Password:</p>
                        <input 
                            type="password"
                            value={typedPass}
                            onChange={(e) => setTypedPass(e.target.value)}
                        />
                    </div>

                    <div>
                        <button>Sign in with Google</button>
                    </div>

                    <div id="sameLine">
                        <p>New?</p>
                        <button onClick={() => {setRegister(true); clearField();}}>Register</button>
                    </div>

                    <div>
                        <button onClick={() => setPage("home")}>Back</button>
                        <button>Sign In</button>
                    </div>
                </div>
            )}
            
            {register && (
                <div>
                    <div>
                        <p>Doctor Finder</p>
                    </div>

                    <div className="inputRow">
                        <p>Username: </p>
                        <input 
                            value={typedUser}
                            onChange={(e) => setTypedUser(e.target.value)}
                        />
                    </div>

                    <div className="inputRow">
                        <p>Email: </p>
                        <input 
                            type="email"
                            value={typedMail}
                            onChange={(e) => setTypedMail(e.target.value)}
                        />
                    </div>

                    <div className="inputRow">
                        <p>Password:</p>
                        <input 
                            type="password"
                            value={typedPass}
                            onChange={(e) => setTypedPass(e.target.value)}
                        />
                    </div>

                    <div className="inputRow">
                        <p>Confirm Password:</p>
                        <input 
                            type="password"
                            value={typedPassAgain}
                            onChange={(e) => setTypedPassAgain(e.target.value)}
                        />
                    </div>

                    <div>
                        <button>Register</button>
                    </div>

                    <div>
                        <button onClick={() => {setRegister(false); clearField();}}>Already have an account?</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login;