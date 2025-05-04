import '../css/HomePage.css'

import homeBG from '../img/doctorpicture.png'
import docHelp from '../img/doctorhelp.jpg'

function HomePage({ setPage }) {
    return (
        <>
        
            <div id="imgContainer">
                <img id="topImg" alt="doctor working" src={homeBG}/>
                <div id="centered">
                    <h1>Dr. Finder</h1>
                   
                </div>
                <div id="top-right">
                    <button onClick={() => setPage("login")}>Sign In</button>
                </div>
            </div>
            
            {/* description */}
            <div id="infoBox">
                <div>
                    
                </div>
                <div>
                    <h3>About Us</h3>
                    <p>We are a non-profit organization that aims to 
                    help people gain access to medical advice from 
                    certified medical professionals on the go!</p>
                </div>
            </div>

            {/* find a doctor */}
            <div id="greyInfoBox">
                <div>
                    <p>Normally you have to wait several days and spend a 
                       lot of money, just so that you could have a doctor 
                       answer your question about health. Fortunately, these 
                       constraints are reduced, because you can message them now!</p>
                    <button onClick={() => setPage("login")}>Find a Doctor</button>
                </div>
                <div>
                    <img alt="doctor picture" src={docHelp} style={{width:'40%'}}/>
                </div>
            </div>

            {/* sign up now */}
            <div id="signUpBottom">
                <p style={{}}>Want to Join?</p>
                <button onClick={() => setPage("login")}>Sign Up Today</button>
            </div>
        </>
    )
}

export default HomePage;