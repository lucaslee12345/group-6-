import { useState } from 'react';
import '../css/Profile.css';

function Profile({ setPage }) {
    return (
        <>
            <div>
                {/* add a button with the profile icon  */}
            </div>

            <div>
                <h3>Doctor Finder</h3>  
            </div>

            <div>
                <h2></h2>
            </div>

            <div>
                <button >Change User</button><br/>
                <button >Change Password</button><br/>
                <button >Change Email</button><br/>
                <button >Log Out</button><br/>
                {/* firebase feature */}
                <button >Delete Account</button> <br/>
            </div>

            {/* navbar, this will serve as  */}
            <div class="nav-bar">
                <button onclick="navigateTo('placeholder.html')">&#8592;</button>
                <button onclick="navigateTo('placeholder.html')">&#8962;</button>
                <button onclick="navigateTo('placeholder.html')">&#9788;</button>
            </div>
        </>
    );
}

export default Profile;