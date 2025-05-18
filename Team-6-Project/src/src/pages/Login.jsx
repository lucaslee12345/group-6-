import { useEffect, useState } from 'react';
import { db, auth, googleProvider } from '../firebase';
import {
 signInWithPopup,
 onAuthStateChanged,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 updateProfile,
} from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import '../css/Login.css';
import icon from '../img/9706583.png';


// TODO: SET DISPLAYNAME IN APP.JSX

function Login({ setPage }) {
 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [register, setRegister] = useState(false);
 const [user, setUser] = useState(null);
 const [error, setError] = useState('');


 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     setUser(currentUser);
     if (currentUser) {
       setPage('profile');
     }
   });
   return () => unsubscribe();
 }, [setPage]);


 const clearFields = () => {
   setUsername('');
   setEmail('');
   setPassword('');
   setConfirmPassword('');
   setError('');
 };


 const handleRegister = async () => {
   setError('');
   if (password !== confirmPassword) {
     setError('Passwords do not match.');
     return;
   }


   try {


     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     const user = userCredential.user;
     updateProfile(user, {displayName: username});


     // TODO: make the username input required in order to not break the system, Jackson Szkeres this is all your fault.
     await setDoc(doc(db, 'Accounts', user.uid), {
       username: username,
       email: user.email,
       createdAt: new Date(),
     });


     setPage('profile');
   } catch (err) {
     alert("Invalid fields has been entered.");
   }
 };


 const handleEmailSignIn = async () => {
   setError('');
   try {
     const usersRef = collection(db, 'Accounts');

     await signInWithEmailAndPassword(auth, email, password);
     setPage('profile');
   } catch (err) {
     if (err.code === 'auth/wrong-password') {
       alert('Incorrect password.');
     } else {
       alert('');
     }
   }
 };


 const handleGoogleSignIn = async () => {
   setError('');
   try {
     const result = await signInWithPopup(auth, googleProvider);
     const user = result.user;
     const userDocRef = doc(db, 'Accounts', user.uid);
     await setDoc(userDocRef, {
       email: user.email,
       googleAccount: true,
       createdAt: new Date(),
     }, { merge: true });
     setPage('profile');
   } catch (err) {
     setError(err.message);
   }
 };


 return (
   <div className="loginContainer">
     <h1>Doctor Finder</h1>
     {error && <p className="error">{error}</p>}
     {!user ? (
       register ? (
         <div>
           <h2>Register</h2>
           <div className="inputRow">
             <p>Username:</p>
             <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Enter username"
             />
           </div>
           <div className="inputRow">
             <p>Email:</p>
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Enter email"
             />
           </div>
           <div className="inputRow">
             <p>Password:</p>
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Enter password"
             />
           </div>
           <div className="inputRow">
             <p>Confirm Password:</p>
             <input
               type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder="Enter confirm password"
             />
           </div>
           <button onClick={handleRegister}>Register</button>
           <p>
             Already have an account?{' '}
             <button onClick={() => { setRegister(false); clearFields(); }}>
               Sign in
             </button>
           </p>
           <button onClick={() => setPage('home')}>Back</button>
         </div>
       ) : (
         <div>
           <img id="icon" src={icon} alt="user icon" />
           <h2>Log In</h2>
           <div className="inputRow">
             <p>Email:</p>
             <input
               type="text"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Enter email"
             />
           </div>
           <div className="inputRow">
             <p>Password:</p>
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Enter password"
             />
           </div>
           <button onClick={handleEmailSignIn}>Sign In</button>
           <button onClick={handleGoogleSignIn}>Sign in with Google</button>
           <p>
             New here?{' '}
             <button onClick={() => { setRegister(true); clearFields(); }}>
               Register
             </button>
           </p>
           <button onClick={() => setPage('home')}>Back</button>
         </div>
       )
     ) : (
       <div>
         <h2>Welcome, {user.email}</h2>
         <button onClick={() => { auth.signOut(); clearFields(); }}>
           Sign Out
         </button>
       </div>
     )}
   </div>
 );
}


export default Login;