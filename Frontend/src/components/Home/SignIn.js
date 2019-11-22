import React, { Component } from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Redirect } from 'react-router';
import '../../styles/Signin.css';
import Particles from 'react-particles-js'
import {connect} from "react-redux";
import {signInMongo} from "../../js/actions/accessActions";

const particleOpt={
  particles:{
          "number":{
              value:150
          },
          "color":{
            value:"#f9f3f4"
          },
          "shape":{
            type:"circle",
            stroke:{
              width:1,
              color:"#ccc"
            }
          },
          "opacity":{
            value:0.5,
            random:true
          },
          "size":{
            value:2
          },
          "line_linked":{
            enable:true,
            distance:110
          },
          "interactivity": {
            "detect_on": "window",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "grab"
              }
        }
      }
    }}

function mapStateToProps(store) {
      return {
          signinSuccess: store.account.signinSuccess,
          signinMessage: store.account.signinMessage,
          userType: store.account.userType,
          userId: store.account.userId
      }
  }
  
function mapDispatchToProps(dispatch) {
      return {
          submitSignIn: (payload) => dispatch(signInMongo(payload))
      };
  }

//Define a Login Component
class Login extends Component {
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    this.submitSignIn = this.submitSignIn.bind(this);
  }

  submitSignIn(e) {
    let data = {
      'email': null,
      'password': null,
      'type': "buyer"
    }
    e.preventDefault();
    data.email = (e.target[0].value);
    data.password = (e.target[1].value);
    console.log("insumbitsign in", data);
    this.props.submitSignIn(data);
  }

  render() {
    let message;
    let redirectVar;

    //if (this.props.signinSuccess != null && this.props.signinSuccess && localStorage.getItem('token') !== null) {
    if (this.props.signinSuccess != null && this.props.signinSuccess && localStorage.getItem('token') !== null) {
        console.log("Signin success");
        redirectVar = (this.props.userType === "buyer") ? <Redirect to="/homeBuyer/upload"/> : <Redirect to="/homeOwner"/>
    }

    if (this.props.signinSuccess != null && !this.props.signinSuccess) {
        message = <div className="unsuccess-signup"><span>{this.props.signinMessage}</span></div>
    }
    return (
        <div class="body">
      <div>
      <Particles 
      params={{
        particleOpt
      }}/>
      </div>
      <div class="text-overlay">
      <React.Fragment>
        <div class="header">
          <a href="/" class="logo">MEDIREPORT</a>
          <div class="header-right">
          </div>
        </div>
        <Form className="create-buyer" onSubmit={this.submitSignIn}>
          <h3><span className="font-weight-bold">Sign in with your MediReport account</span></h3>
          <h5>{this.props.message}</h5>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="Email" name="email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" placeholder="Password" name="password" minlength="8" required></Input>
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block">Sign in</Button>
          <div className="text-center pt-3">Or</div>
          <FacebookLoginButton />
          <GoogleLoginButton />
          <div className="text-centre">
            <a href="/create">Create your account</a>
          </div>
        </Form>
      </React.Fragment>
      </div>
      </div>
      
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);