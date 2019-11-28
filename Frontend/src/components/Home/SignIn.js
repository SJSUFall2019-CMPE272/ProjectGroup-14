import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {Redirect} from 'react-router';
import '../../styles/Signin.css';
import Particles from 'react-particles-js'
import {connect} from "react-redux";
import {signInMongo,facebookAuth,googleAuth} from "../../js/actions/accessActions";

const particleOpt = {
    particles: {
        "number": {
            value: 150
        },
        "color": {
            value: "#f9f3f4"
        },
        "shape": {
            type: "circle",
            stroke: {
                width: 1,
                color: "#ccc"
            }
        },
        "opacity": {
            value: 0.5,
            random: true
        },
        "size": {
            value: 2
        },
        "line_linked": {
            enable: true,
            distance: 110
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
    }
};

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
        facebookAuth: dispatch(facebookAuth),
        googleAuth: dispatch(googleAuth)
    };
}

//Define a Login Component
class Login extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        this.submitSignIn = this.submitSignIn.bind(this);
        this.facebookAuth = this.facebookAuth.bind(this);
        this.googleAuth = this.googleAuth.bind(this);
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

        //this.props.signInBuyer({"user": data});
        this.props.submitSignIn({"user": data});
    }

    render() {
        let message;
        let redirectVar;

        //if (this.props.signinSuccess != null && this.props.signinSuccess && localStorage.getItem('token') !== null) {
        if (this.props.signinSuccess !== null && this.props.signinSuccess === true && localStorage.getItem('token') !== null) {
            console.log("Signin success");
            redirectVar = (this.props.userType === "buyer") ? <Redirect to="/upload"/> :
                <Redirect to="/homeOwner"/>
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
                            <a href="/" class="logo">MEDIREPORT</a>
                            <div class="header-right">
                            </div>
                        </div>
                        <Form className="create-buyer" onSubmit={this.submitSignIn}>
                            <h3><span className="font-weight-bold">Sign in with your MediReport account</span></h3>
                            <h5>{this.props.message}</h5>
                            <FormGroup>
                                <Label>Email</Label>
                                {/*<Input type="email" placeholder="Email" name="email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>*/}
                                <Input placeholder="Email" name="email" placeholder="abc@example.com" required></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                {/*<Input type="password" placeholder="Password" name="password" minlength="8" required></Input>*/}
                                <Input type="password" placeholder="Password" name="password" required></Input>
                            </FormGroup>
                            <Button className="btn-lg btn-dark btn-block">Sign in</Button>
                            <div className="text-center pt-3">Or
                            <div className="text-center pt-3" style={{color:"black"}}>
                            <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
                            <GoogleLoginButton onClick={this.googleAuth}/>
                                <a href="/signup">Create your account</a>
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