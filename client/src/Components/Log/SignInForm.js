import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/"; //ALler a l'accueil
        }
      })
      .catch((err) => console.log(err));
    
  };

  return (
    <form className="sign-form" onSubmit={handleLogin}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        value={email}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onInput={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <div className="email-error error"></div>
      <div className="password-error error"></div>
      <input className="btn-form" type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
