import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {Redirect} from 'react-router';
import '../../styles/Signin.css';
import {connect} from "react-redux";
import {signInMongo} from "../../js/actions/accessActions";
import { GoogleLogin } from 'react-google-login';

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
        submitSignIn: (payload) => dispatch(signInMongo(payload)),
    };
}

//Define a Login Component
class Login extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        this.submitSignIn = this.submitSignIn.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    facebookAuth = () => {
        this.props.facebookAuth();

    };

    googleAuth = () => {
        this.props.googleAuth();

    };
    submitSignIn(e) {
        e.preventDefault();
        const data = {
            'emailId': null,
            'password': null,
            'userType': "buyer"
        };

        data.emailId = (e.target[0].value);
        data.password = (e.target[1].value);

        console.log("signInBuyer payload");
        console.log({"user": data});
        localStorage.setItem("age",26);
        localStorage.setItem("gender","male");
        localStorage.setItem("name",e.target[0].value);
        //this.props.signInBuyer({"user": data});
        this.props.submitSignIn({"user": data});
    }
    responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem("age","26");
        localStorage.setItem("gender",);
        localStorage.setItem("name","sakshi");
        
      }

    render() {
        let message;
        let redirectVar;

        //if (this.props.signinSuccess != null && this.props.signinSuccess && localStorage.getItem('token') !== null) {
        if (this.props.signinSuccess !== null && this.props.signinSuccess === true && localStorage.getItem('token') !== null) {
            console.log("Signin success");
            redirectVar = (this.props.userType === "buyer") ? <Redirect to="/upload"/> :
                <Redirect to="/signup"/>
        }

        return (
            <div>
                {redirectVar}
            <div style={{width:"58%",float:"left"}} class="body">
                </div>
                {/* <div>
                    <Particles
                        params={{
                            particleOpt
                        }}/>
                </div> */}
                <div style={{width:"42%",float:"right"}}>
                {/* <div class="text-overlay"> */}
                    <React.Fragment>
                        <div class="header">
                            <a style={{color:"blue"}} href="/" class="logo">MEDIREPORT</a>
                            <div class="header-right">
                            </div>
                        </div>
                        <Form className="create-buyer" onSubmit={this.submitSignIn}>
                            <h3><span className="font-weight-bold">Sign in with your MediReport account</span></h3>
                            <h5>{this.props.message}</h5>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" placeholder="Email" name="email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
                                {/* <Input placeholder="Email" name="email" placeholder="abc@example.com" required></Input> */}
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password"  placeholder="********" name="password" minlength="8" required></Input>
                                {/* <Input type="password" placeholder="Password" name="password" required></Input> */}
                            </FormGroup>
                            <Button className="btn-lg btn-dark btn-block">Sign in</Button>
                            <div className="text-center pt-3">
                                {/* Or */}
                            <div className="text-center pt-3" style={{color:"black"}}>
                            
                            {/* <GoogleLogin
    clientId="986335033587-3sjcnb8lqm06tgkifhsc5bshipp9ldga.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
                                <br/><a href="/signup">Create your account</a>
                                </div>
                            </div>
                        </Form>
                    </React.Fragment>
                </div>
                {/* </div> */}
            // </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);