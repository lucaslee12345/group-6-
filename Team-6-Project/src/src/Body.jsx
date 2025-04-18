import aboutImage from "./assets/images/image.png";

function Body(){


    return(
            <><h1>Welcome!</h1><a id="signin" href="loginpage.html">Sign In</a><br/>
            <section id="about">
                <h1 id="aboutTitle">About us</h1>
                <img id = "aboutImage" src = {aboutImage}/>
                    <p>We are a non-profit organization <br/>that aims to help people gain
                        <br/> access to medical advice <br/> from certified medical <br/> professionals on the go!</p>
                        </section>
                            <section id="joinOffer">
                                <br/>
                                    <br/>
                                        <br/>
                                            <br/>
                                                <br/>
                                                    <br/>
                                                        <br/>
                                                            <br/>
                                                                <h3>Want to Join?</h3>
                                                                <a href="registerpage.html">Sign Up Today!</a>
                                                            </section>

        <br/>
        <br/>
        <h1>Log In</h1>
        <section id = "loginCredentials">
            <a href = "loginpageWithphone.html">Use Phone Number Instead</a>
        <p>Email: </p><input id = "email" placeholder="Enter email here."/>
        <br/>
        <p>Password: </p><input id = "password" placeholder="Enter password here."/>
        <br/>
        <br/>
        <br/> 
        </section>
        <input id = "staySignedIn" type = "checkbox"/>
        <label for = "staySignedIn">Stay Signed In</label>
        <button id = "login">Log In</button>

        <br/>
        <br/>

        <p>New?</p>
        <a href = "registerpage.html">Sign Up Here.</a>
        <h1>Log In</h1>
        <section id = "loginCredentials">
            <a href = "loginpage.html">Use Email Instead</a>
        <p>Phone Number: </p><input id = "phone" placeholder="Enter phone number here."/>
        <br/>
        <p>Password: </p><input id = "phonePassword" placeholder="Enter password here."/>
        <br/>
        <br/>
        <br/>
        </section>
        <input id = "staySignedIn" type = "checkbox"/>
        <label for = "staySignedIn">Stay Signed In</label>
        <button id = "loginWithNumber">Log In</button>

        <p>New?</p>
        <a href = "registerpage.html">Sign Up Here.</a>
                                                            </>
                                                            );
                                                            }

export default Body;
