import React, { useState } from 'react';
import '../Components.css'

const Monitor = ({ loggedInUser }) => {
  const [bloodSugarTaken, setBloodSugarTaken] = useState(false);
  const [bloodSugarValue, setBloodSugarValue] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [valueRecorded, setValueRecorded] = useState(false);
  const [responseRecorded, setResponseRecorded] = useState(false);
  const [ketoneClicked, setKetoneClicked] = useState(false);
  const [reason, setReason] = useState('');

  const handleYesClick = () => {
    setButtonClicked(true);
    setBloodSugarTaken(true);
  };

  const handleNoClick = () => {
    setButtonClicked(true);
  };

  const handleBloodSugarSubmit = (event) => {
    event.preventDefault();
    if(bloodSugarValue >= 1 && bloodSugarValue < 999){
        setValueRecorded(true);
    } else {
        alert("Please enter a value between 1 and 999");
    }
    
  };

  const handleReasonSubmission = () => {
    if(reason !== ''){
        setResponseRecorded(true);
    } else {
        alert("Please enter your reasoning in the text box")
    }
  }

  return (
    <div>
      {!responseRecorded ? (
        <>
          <h1 style={{marginRight:50}}>Welcome!</h1>
          {!buttonClicked && (
            <div>
              <p>Have you taken your blood sugar readings for today?</p>
              <div class='button-container'>
              <button onClick={handleYesClick}>Yes</button>
              <button onClick={handleNoClick}>No</button>
              </div>
            </div>
          )}
  
          {buttonClicked && !bloodSugarTaken && (
            <div>
              <p>Please take your blood sugar readings immediately, then click the button below</p>
              <div class='button-container'>
                <button onClick={handleYesClick}>I have taken my readings</button>
              </div>
            </div>
          )}
  
          {buttonClicked && bloodSugarTaken && (
            <form onSubmit={handleBloodSugarSubmit}>
              <p>
                Enter your blood sugar value:
                <input
                  type="number"
                  value={bloodSugarValue}
                  onChange={(e) => setBloodSugarValue(e.target.value)}
                  required
                  style={{marginTop:10}}
                  title='Please provide your blood sugar reading'
                />
              </p>
              <div class='button-container'>
                <button type="submit">Submit</button>
              </div>
            </form>
          )}
  
          {bloodSugarTaken && valueRecorded && (
            <div>
              {bloodSugarValue < loggedInUser.lowGlucose && (
                <div>
                  <p>Your blood sugar reading is low.</p>
                  <p>Remember to eat a sugar source, take your medicine, and eat meals and snacks as described by {loggedInUser.doctorName}</p>
                  <p>Please explain why you think your blood sugar reading is low: </p>
                  <input 
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required/>
                  <div class='button-container'>
                    <button onClick={() => handleReasonSubmission(true)}>Submit & Continue</button>
                  </div>
                </div>
              )}
  
              {bloodSugarValue > loggedInUser.highGlucose && (
                <div>
                  <p>Your blood sugar reading is high.</p>
                  <p>You should call your doctor immediately:</p>
                  <p>{loggedInUser.doctorName}</p>
                  <p>{loggedInUser.doctorPhoneNumber}</p>
                  <p>Is there a presence of ketones in your urine?</p>
                  <div class='button-container'>
                    <button onClick={() => setKetoneClicked(true)}>Yes</button>
                    <button onClick={() => setKetoneClicked(true)}>No</button>
                  </div>
                  {ketoneClicked && (
                    <div>
                    <p>Please explain why you think your blood sugar reading is high: </p>
                  <input 
                    type="text"
                    title='Click in the box and type a brief explanation of what you think contributed to your high blood sugar today'
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required/>
                  <div class='button-container'>
                    <button style={{marginTop:20}}onClick={() => handleReasonSubmission(true)}>Submit & Continue</button>
                  </div>
                  </div>
                  )}
                  
                </div>
              )}
  
              {bloodSugarValue > loggedInUser.lowGlucose && bloodSugarValue < loggedInUser.highGlucose && (
                <div>
                  <p>Good job! Your blood sugar readings are within your normal range.</p>
                  <p>Click the button below to continue</p>
                  <div class='button-container'>
                    <button onClick={() => setResponseRecorded(true)}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        // Display thank you screen here
        <div>
          <h2 style={{marginRight:60}}>Thank You!</h2>
          <p>Your response has been recorded.</p>
          <p>Click the Logout button in the upper left of the page to log out.</p>
        </div>
      )}
    </div>
  );
};

export default Monitor;