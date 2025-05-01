import { useEffect, useState } from 'react';
import { db, auth, googleProvider } from '../firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import '../css/Login.css';
import icon from '../img/Person-icon.jpg';

function Login({ setPage }) {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  // Email/Password Sign-Up
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      setUser(newUser);
  
      // Use the correct path: /Accounts/Users/{uid}
        const userDocRef = doc(db, 'Accounts', newUser.uid);
        await setDoc(userDocRef, {
            email: newUser.email,
            nickname: '',
            age: '',
        });
  
      alert('Registration successful');
    } catch (error) {
      console.error('Registration error:', error.message);
      alert(error.message);
    }
  };  

  // Email/Password Sign-In
  const handleEmailSignIn = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setNickname('');
      setAge('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Save Profile
  const handleSaveProfile = async () => {
    if (!nickname || !age) {
      alert('Please enter both nickname and age');
      return;
    }

    const userDocRef = doc(db, 'Accounts', user.uid);
    await setDoc(userDocRef, {
        nickname,
        age,
        email: user.email
    });


    alert('Profile saved!');
  };

  // Load Profile on Auth Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, 'Accounts', currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNickname(data.nickname || '');
          setAge(data.age || '');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="loginContainer">
      <h1>Doctor Finder</h1>

      {!user ? (
        register ? (
          <div>
            <h2>Register</h2>
            <div className="inputRow">
              <p>Email:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputRow">
              <p>Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="inputRow">
              <p>Confirm Password:</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputRow">
              <p>Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>

          <h3>Edit Profile</h3>
          <div className="inputRow">
            <p>Nickname:</p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="inputRow">
            <p>Age:</p>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
      )}
    </div>
  );
}

export default Login;
