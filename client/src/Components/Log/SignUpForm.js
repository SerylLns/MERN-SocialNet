import axios from "axios";
import React, { useState } from "react";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo-error");
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          pseudoError.innerHTML = res.data.errors.pseudo;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {formSubmit ? (
        <>
          <h4 className="sign-success">Enregistrement réussi, veuillez-vous connecter</h4>
          <SignInForm />
        </>
      ) : (
        <form className="sign-form" onSubmit={handleRegister}>
          <input
            onInput={(e) => {
              setPseudo(e.target.value);
            }}
            type="text"
            name="pseudo"
            value={pseudo}
            placeholder="Nom d'utilisateur"
          />
          <div className="pseudo-error error"></div>
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            value={email}
            placeholder="Email"
          />
          <div className="email-error error"></div>
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
            name="password"
            placeholder="Password"
          />
          <div className="password-error error"></div>
          <input className="btn-form" type="submit" value="S'inscrire" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
