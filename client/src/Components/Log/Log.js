import { Button } from "antd";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setSignInModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(true);
    }
    else if (e.target.id === 'login') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  }
  return (
    <div className="log-container">
      <h1 style={{textAlign:'center', color: '$dark-blue'}}>Inscription</h1>
      <ul className="buttons-log">
        <li
          onClick={handleModals}
          id="register"
          className={signUpModal ? "button-log active" : "button-log"}
        >
          S'inscrire
        </li>
        <li
          onClick={handleModals}
          id="login"
          className={signInModal ? "button-log active" : "button-log"}
        >
          Se connecter
        </li>
      </ul>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  );
};

export default Log;
