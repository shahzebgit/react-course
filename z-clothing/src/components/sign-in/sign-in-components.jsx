import React from "react";

import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input";
import CusButton from "../custom-button/custom-button";

import {auth, signInWithGoogle } from "../../firebase/firebase.util";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  handleSubmit = async event => {
    event.preventDefault();

    const { email, password} = this.state;
    try{
      await auth.signInWithEmailAndPassword(email ,password);
      this.setState({
        email: "",
        password: ""
      });
    }catch(error){
      console.log(error)
    }
    
    
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            label="password"
            handleChange={this.handleChange}
            required
          />

          <div className="button">
            <CusButton type="submit">SIGN IN</CusButton>
            <CusButton onClick={signInWithGoogle} isGoogleSignIn>
              SIGN IN WITH GOOGLE
            </CusButton>
          </div>
        </form>
      </div>
    );
  }
}
export default SignIn;
