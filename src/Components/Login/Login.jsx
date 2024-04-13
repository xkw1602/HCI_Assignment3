// Login.js

import React from 'react';

const Login = ({ users, onLogin }) => {
  return (
    <div>
      <h1>Login</h1>
      <h2>Please select your profile:</h2>
      <div className='button-container'>
        {users.map(user => (
          <button key={user.id} onClick={() => onLogin(user)}>
            {user.name.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;