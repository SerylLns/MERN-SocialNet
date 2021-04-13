import React from 'react';

const SignUpForm = () => {

  return (
    <form className="sign-form">
      <input type="text" name="username" placeholder="Nom d'utilisateur" />
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="email" placeholder="Password" />
      <input className="btn-form" type="submit" value="S'inscrire" />
    </form>
  );
};

export default SignUpForm;