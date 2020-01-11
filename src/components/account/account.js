import React, { Component } from 'react'

import '../Login/Login.css';
import LoginPage from '../Login/login.js';
import Signup from '../signup/Signup.js';
import logo from '../../images/logo.svg';

import btbg from '../../images/bt-bg.svg'

export class Account extends Component {

    state = {
        component: "Signin"
    }

    changeComponent = (component) => {
        this.setState({component: component});
    }

    render() {
        return (
            <div className='wraper'>
                <div className='designWraper'>
                    <div className='emptyDiv'></div>
                    <div className='logo'>
                        <img src={logo} alt="Smiley face" height="138" width="348" className='secondImage' ></img>
                    </div>
                    <div className='disign'>
                        <img alt="bg" src={btbg}/>
                    </div>
                </div>
                <div>
                {this.state.component === "Signin" ? <LoginPage changeComponent={this.changeComponent}
                 setSignedInUser={this.props.setSignedInUser} /> : <Signup changeComponent={this.changeComponent}/>}
          </div>  
          </div>
        )
    }
}

export default Account;
