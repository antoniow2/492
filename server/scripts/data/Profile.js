import React, { useState, useEffect } from 'react';
import './App.css'; 

const ProfilePage = () => {
  const [user, setUser] = useState({
        name: 'Justin the best',
        email: 'testing@gmail.com',
        profilePicture: null,
   });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({...prevUser, profilePicture: reader.result,}));
        // using local storage to save picture
        localStorage.setItem('profilePicture', reader.result);
      };

      reader.readAsDataURL(file);
    }
  };



  useEffect(() => {
    setUser((prevUser) => ({...prevUser,profilePicture: localStorage.getItem('profilePicture'),}));
  }, []);

  const handleUploadButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="profile-centering">
      <div className="img-button-centering">
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{ width: '100px', borderRadius: '50%', margin: '10px' }}
          />
        )}
        <button onClick={handleUploadButtonClick}>Upload Image</button>
      </div>
      <input
        type="file"
        id="fileInput"
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <h1>My Profile</h1>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );


};

export default ProfilePage;