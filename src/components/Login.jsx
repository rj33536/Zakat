import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../utils/firebase';
import firebase from "firebase"
import classes from './login.module.css';
function Login(props) {

  const handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    var number = document.getElementById("phone").value;
    firebase
      .auth()
      .signInWithPhoneNumber("+91" + number, recaptcha)
      .then(function (e) {
        var code = prompt('Enter the OTP', '');
        if (code === null) return;
        return e.confirm(code);
      })
      .then(function (result) {
        alert("Number verified successfully");

        return firebase
          .database()
          .ref("/userdetail/" + number)
          .once("value")


      }).then((data) => {
        console.log(data.val());
        const userObj = {
          phone: number,
          fullname: "",
          address: ""
        };
        if (data.val() == null) {
          firebase.database().ref("/userdetail/" + number)
            .update(userObj)
            .then((res) => {
              localStorage.setItem('user', JSON.stringify(userObj));
              props.setUser(userObj);
            });
        } else {

          localStorage.setItem('user', JSON.stringify(userObj));
          props.setUser(data.val());
        }

      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className={classes.back}>
      <h1 class="text-center py-5">Zakat</h1>
      
      <div className={classes.loginpage}>
        <div class="form-group" >
          
    
          <input type="tel" id="phone" class="inplogin" name="phone" pattern="[7-9]{1}[0-9]{9}" required class="form-control my-3" aria-describedby="emailHelp" placeholder="Enter Your Phone Number"
          />
          <div id="recaptcha"></div>
          <button className="btn btn-dark btn-block my-3" onClick={handleClick}>Verify Phone Number</button>
        </div>
      </div>
    </div>
  )
}
export default Login;