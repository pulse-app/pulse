import React, { Component } from "react";
import { Redirect } from "react-router";
import "./Login.css";
import bg_tp from "../../images/bg-tp.svg";
import { users } from "../../data/data";

class LoginPage extends Component {
  state = {
    title: "Sign in",
    email: "",
    password: "",
    PasswordError: "",
    EmailError: "",
    error: "",
    redirect: false
  };

  signin() {
    const { PasswordError, EmailError, email, password } = this.state;
    if(email === "" || password === ""){
       if(email === '') {
        this.setState({
          EmailError: "Email is required",
    });
       }else{
          this.setState({
            PasswordError: "Password is required",
      });
       }
      
    }else if (PasswordError === "" && EmailError === "") {
      users.map(user => {
        if (
          this.state.email === user.email &&
          this.state.password === user.password
        ) {
          this.props.setSignedInUser(user);
          this.setState({ redirect: true });
        }
        return user;
      });
      this.setState({
        error: (
          <div className="sign-in__form__message-box">
            Invalid Email or Password
          </div>
        )
      });
    }
  }

  inputValidation(e) {
    if (e.target.name === "password") {
      const PassWordRegEx = /^((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9])(?=.{8,})/;
      if (!PassWordRegEx.test(e.target.value)) {
        this.setState({
          PasswordError: "Invalid password",
          error: ""
        });
      } else {
        this.setState({
          password: e.target.value,
          PasswordError: "",
          error: ""
        });
      }
    } else if (e.target.name === "email") {
      const EmailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!EmailRegEx.test(e.target.value)) {
        this.setState({ EmailError: "Invalid email", error: "" });
      } else {
        this.setState({
          email: e.target.value,
          EmailError: "",
          error: ""
        });
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="Lform">
        <div className="loginImage">
          <img alt="bg-tp" src={bg_tp} />
        </div>

        <div className="title">{this.state.title}</div>

        <div className="loginformwraper">
          {this.state.error}
          <form id="loginForm">
            <label>Email</label>
            <input
              id="email"
              className="loginSignUpInput"
              type="email"
              name="email"
              onChange={e => this.inputValidation(e)}
            />
            <div className="sign-in__form__email-label">
              {this.state.EmailError}
            </div>
            <label>Password</label>
            <input
              id="password"
              className="loginSignUpInput"
              type="password"
              name="password"
              onChange={e => this.inputValidation(e)}
            />
            <div className="sign-in__form__password-label">
              {this.state.PasswordError}
            </div>

            <div id="loginLInk">Forgot password?</div>
            <div className="loginSignUpBtn" onClick={() => this.signin()}>
              {this.state.title}
            </div>
            <div
              onClick={() => {
                this.props.changeComponent("Signup");
              }}
              id="loginLInk"
            >
              Create account
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
