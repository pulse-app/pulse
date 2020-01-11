import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import logo from "../../images/logoPulse.png";
import avatar from "../../images/profile-icon.png";
import "./styles.css";

class SideMenu extends Component {
  state = {
    redirectUser: false
  };
  // Function to change this state accordingly
  changeState = () => {
    const { ...data } = this.state;
    return (data.redirect = !data.redirect);
  };

  //Function to check if there are props
  checkIfIsProps = () => {
    if (!this.props.user.type) {
      return this.changeState();
    }
    return false;
  };

  render() {
    if (this.checkIfIsProps()) {
      return <Redirect to="/account" />;
    }
    // this where the side menu component is implemented
    return (
      <div className="side-menu">
        <img src={logo} alt="Logo" className="img-dashboard" />
        <div className="info">
          <div className="avatar">
            <img src={avatar} alt="avatar icon" />
          </div>
          <h2>{this.props.user.names}</h2>
          <p>{this.props.user.email}</p>
          <div className="btn__container">
            <button className="btn-dashboard" onClick={this.props.onClick}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenu;
