// App.js
import './App.css';

import React, { useState } from 'react';
import Login from './Components/Login/Login';
import Monitor from './Components/Monitor/Monitor';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Define users with their respective information
  const users = [
    { id: 1, name: "Sara Norman", patientId: "5344-9709", doctorName: "Dr. Jason Rosenberg", doctorPhoneNumber: "579-0432", lowGlucose: 80, highGlucose: 140},
    { id: 2, name: "Gregg Norman", patientId: "1275-4307", doctorName: "Dr. Nikhil Singh", doctorPhoneNumber: "334-2309", lowGlucose: 70, highGlucose: 120}
  ];

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <p class='user-info'>{loggedInUser.name}</p>
          <p class='user-info'>Patient ID: {loggedInUser.patientId}</p>
          <button class='user-info' style={{float: 'left'}} onClick={handleLogout}>Logout</button>
          <Monitor loggedInUser={loggedInUser} />          
        </div>
      ) : (
        <Login users={users} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;