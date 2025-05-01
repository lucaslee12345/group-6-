import { useEffect, useState } from 'react';
import { db, auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, setDoc, getDoc} from 'firebase/firestore';
import '../css/Login.css';
import icon from '../img/Person-icon.jpg';


function SignIn({setPage}) {

        
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [passAgain, setPassAgain] = useState("");
    const [user, setUser] = useState(null);

    // google sign in - works, logout in profiles
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Login failed: ', error)
        }
    }

    // sign in, search for it in the firebase
    const handleEmailSignIn = async () => {

    }

    // reigster and create a new UID as the name with fields under it
    const handleRegister = async () => {

    }


    // const auth = getAuth();
    // const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
          });
      
          return () => unsubscribe();
    })

    const clearField = () => {
        setMail("");
        setPass("");
        setPassAgain("");
    }
    return(
            <div>
                    <div>
                        <p>Doctor Finder</p>
                    </div>

                    <div className="inputRow">
                        <p>Email: </p>
                        <input 
                            type="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>

                    <div className="inputRow">
                        <p>Password:</p>
                        <input 
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>

                    <div className="inputRow">
                        <p>Confirm Password:</p>
                        <input       
                            type="password"             
                            value={passAgain}
                            onChange={(e) => setPassAgain(e.target.value)}
                        />
                    </div>

                    <div>
                        <button onClick={() => {setRegister(false); clearField();}}>Already have an account?</button>
                    </div>

                    <div>
                        <button onClick={() => setPage("home")}>Back</button>
                        <button onClick={() => anyInvalidation()}>Register</button>
                    </div>
                </div>
    )
    }  

export default SignIn;