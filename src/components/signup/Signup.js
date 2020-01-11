import React, { Component } from "react";
import {Redirect} from "react-router";
import "./signup.css";
import { users } from "../../data/data";
class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    error: "",
    successMsg:"",
    redirect: false,
    type: "Software engineer",
    userExist: true
  };

  handleInputChange = event => {
    if (event.target.name === "name") {
      this.setState(
        {
          name: event.target.value
        },
        () => {
          this.validateName();
        }
      );
    } else if (event.target.name === "email") {
      this.setState(
        {
          email: event.target.value
        },
        () => {
          this.validateEmail();
        }
      );
    } else if (event.target.name === "password") {
      this.setState(
        {
          password: event.target.value
        },
        () => {
          this.validatePassword();
        }
      );
    }
  };

  validateName = e => {
    const { name } = this.state;
    if (name.length > 3) {
      this.setState({
        nameError: ""
      });
    } else {
      this.setState({
        nameError: "Name length must be at least 3"
      });
    }
  };
  validateEmail = () => {
    const { email } = this.state;
    const EmailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!EmailRegEx.test(email)) {
      this.setState({
        emailError: "Email is not valid"
      });
    } else {
      this.setState({
        emailError: ""
      });
    }
  };
  validatePassword = () => {
    const { password } = this.state;
    const PassWordRegEx = /^((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9])(?=.{8,})/;
    if (!PassWordRegEx.test(password)) {
      this.setState({
        passwordError:
          "Required 8 characters,UPPER/lowercase and number"
      });
    } else {
      this.setState({
        passwordError: ""
      });
    }
  };
  signup() {
    const {
      name,
      email,
      password,
      nameError,
      emailError,
      passwordError,
      type
    } = this.state;

    if (nameError === "" && emailError === "" && passwordError === "") {
      if (name !== "" && email !== "" && password !== "") {
        users.map(user => {
          if (user.email === email) {
            this.setState({userExist: false});
          }
          return user;
        });
        if (this.state.userExist === true) {
          let newUser = { userId: users.length+1, name: name, email: email, password:password, type: type };
          users.push(newUser);
          
          this.setState({ redirect:true});
        } else {
          this.setState({
            error: (
              <div className="sign-up-form-message-box">
                Email already exist
              </div>
            )
          });
        }
      } else {
        this.setState({
          error: (
            <div className="sign-up-form-message-box">
              Please enter data before submit
            </div>
          )
        });
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="signup-box">
        <div className="signup-logo-container">
          <div className="signup-logo">
            <svg
              width="125"
              height="78"
              viewBox="0 0 125 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M36.0777 0C-8.05526 34.8079 -24.4853 69.2645 64.7602 73.9093C87.1963 75.077 107.201 76.1169 125 77.0412V0H36.0777Z"
                fill="#0094FF"
              />
            </svg>
          </div>
        </div>
        <div className="signup-form-container">
          <div className='signup-header__wraper'>
            <div className="signup-header">Sign up
            </div>
            {this.state.error}

           
          </div>
          

          <div className="signup-form">
            
            <form>
              <label className="label-text">Full Name</label>
              <input
                id="input-border"
                className="form-control form-control-lg "
                type="text"
                name="name"
                onChange={this.handleInputChange}
              />
              <div className="invalid-feedback">{this.state.nameError}</div>

              <label className="label-text">Email</label>
              <input
                id="input-border"
                className="form-control form-control-lg "
                type="email"
                name="email"
                onChange={this.handleInputChange}
              />
              <div className="invalid-feedback">{this.state.emailError}</div>
              <label className="label-text">Password</label>
              <input
                id="input-border"
                className="form-control form-control-lg "
                type="password"
                name="password"
                onChange={this.handleInputChange}
              />
              <div className="invalid-feedback">{this.state.passwordError}</div>

              <div
                type="submit"
                className="loginSignUpBtn"
                onClick={() => this.signup()}
              >
                Sign up
              </div>
              <div
                onClick={() => {
                  this.props.changeComponent("Signin");
                }}
              >
                <h3 className="signin-text">Go to sign in</h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// class Text extends Component {
//   state = {};
//   render() {
//     return (
//       <div>
//         <h5 className="input-text">{this.props.text}</h5>
//       </div>
//     );
//   }
// }

export default Signup;
