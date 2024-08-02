import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import { useParams } from 'react-router-dom';

function ProfileComponent() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AuthService.getUserById(id)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="bringa">
      <div className="loginBox">
        <form>
          <h2>User Profile</h2>
          <div className="inputBox">
           <h2>Id: </h2> <h3>{user.id}</h3>
          </div>
          <div className="inputBox">
           <h2>Name: </h2> <h3>{user.username}</h3>
          </div>
          <div className="inputBox">
            <h2>Email:</h2><h3> {user.email}</h3>
          </div>
          <div className="inputBox">
            <h2>Image:</h2>
            <img src={AuthService.getImageUrl(user.image)} alt={user.username} height={250}  width={250}/>
          </div>
        </form>

      </div>
      
    </div>
  );
}

export default ProfileComponent;
