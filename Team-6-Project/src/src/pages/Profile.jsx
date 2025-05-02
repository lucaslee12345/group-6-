import { useState } from 'react';
import '../css/Profile.css';

function Profile({ setPage }) {
    return (
        <>
            <div className="top-bar">
                <img id="logo" src="INSERT IMAGE OF DR. FINDER LOGO" alt="Doctor Finder Logo" />
            </div>
            <br />
            <div className="home">
                <h1>Home</h1>
                <h2>Hello, USERID!</h2>
                <img src="FILLER PROFILE" alt="User Profile" />
            </div>

            <div className="body-buttons">
                <button className="button" onClick={() => setPage('changeUser')}>Change User</button>
                <br />
                <button className="button" onClick={() => setPage('changePassword')}>Change Password</button>
                <br />
                <button className="button" onClick={() => setPage('changeEmail')}>Change Email</button>
                <br />
                <button className="button" onClick={() => setPage('logout')}>Log Out</button>
                <br />
                <button className="button" onClick={() => setPage('deleteAccount')}>Delete Account</button>
                <br />
            </div>

            <footer className="nav-bar">
                <button className="button" onClick={() => setPage('back')}>&#8592;</button>
                <button className="button" onClick={() => setPage('home')}>&#8962;</button>
                <button className="button" onClick={() => setPage('settings')}>&#9788;</button>
            </footer>
        </>
    );
}

export default Profile;
