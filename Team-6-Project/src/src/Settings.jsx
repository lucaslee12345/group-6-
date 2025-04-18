
function Settings(){



return (
    <><img src="Person-icon.jpg" alt="profile-icon" /><header>
        <h1>Dr. Finder</h1>
        <h2>Settings</h2>
    </header><div class="settings-buttons">
            <button onclick="navigateTo('placeholder.html')">Change User</button>
            <button onclick="openPopup('changePasswordPopup')">Change Password</button>
            <button onclick="openPopup('changeEmailPopup')">Change Email</button>
            <button onclick="navigateTo('placeholder.html')">Log Out</button>
            <button class="delete" onclick="openPopup('deleteAccountPopup')">Delete Account</button>
        </div><div class="nav-bar">
            <button onclick="navigateTo('placeholder.html')">&#8592;</button>
            <button onclick="navigateTo('placeholder.html')">&#8962;</button>
            <button onclick="navigateTo('placeholder.html')">&#9788;</button>
        </div>
<div id="changePasswordPopup" class="popup-overlay">
<div class="popup">
<span class="close" onclick="closePopup('changePasswordPopup')">&times;</span>
<h2>Change Password</h2>
<input type="password" placeholder="Current Password" id="currentPass"/>
<input type="password" placeholder="New Password" id="newPass"/>
<input type="password" placeholder="Confirm New Password" id="confirmNewPass"/>
<button onclick="submitChangePassword()">Submit</button>
</div>
</div>


<div id="changeEmailPopup" class="popup-overlay">
<div class="popup">
<span class="close" onclick="closePopup('changeEmailPopup')">&times;</span>
<h2>Change Email</h2>
<input type="email" placeholder="Current Email" id="currentEmail"/>
<input type="email" placeholder="New Email" id="newEmail"/>
<input type="email" placeholder="Confirm New Email" id="confirmNewEmail"/>
<button onclick="submitChangeEmail()">Submit</button>
</div>
</div>


<div id="deleteAccountPopup" class="popup-overlay">
<div class="popup">
<span class="close" onclick="closePopup('deleteAccountPopup')">&times;</span>
<h2>Do you really want to delete your account?</h2>
<input type="password" placeholder="Type password to confirm" id="deletePass"/>
<button class="delete-btn" onclick="submitDeleteAccount()">Delete Account</button>
</div>
</div>


</>
)
}

export default Settings;
