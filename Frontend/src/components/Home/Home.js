import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import '../../styles/Navbar.css';
// import FormPage from './FormPage.js'
import { signUpMongo } from "../../js/actions/accessActions";
import { connect } from "react-redux";
import { Redirect } from 'react-router';

function mapStateToProps(store) {
    return {
        signupSuccess: store.account.signupSuccess,
        signupMessage: store.account.signupMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitSignUp: (book) => dispatch(signUpMongo(book))
    };
}


class Navbar extends Component {
    constructor(props) {
        super(props);
        //maintain the state required for this component
        this.state = {
            genderOptions: ['Male', 'Female', 'Others'],
            google: false
        }
        this.submitSignUp = this.submitSignUp.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    submitSignUp = (e) => {
        e.preventDefault();
        //const data = new FormData(e.target);
        const data = {};
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].name !== "") {
                data[e.target[i].name] = e.target[i].value;
            }
        }

        data.userType = "buyer";
         
        console.log("signUpBuyer data");
        console.log(data);
        let name = data.firstName + data.lastName;
        localStorage.setItem("age",data.age);
        localStorage.setItem("gender",data.select);
        localStorage.setItem("name",name);
        // this.props.signUpBuyer(data);
        //this.props.signUpBuyer({"user": {"username": "x", "password": "x"}});
        //this.props.signUpBuyer({"user": {firstName: "x", lastName: "x", emailId: "x", password: "x", userType: "buyer"}});
        this.props.submitSignUp({ "user": data });

    };

    responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem("age","26");
        localStorage.setItem("gender",);
        localStorage.setItem("name","sakshi");
       this.setState({
           google:true
       })
      }
       
    render() {
        const redirectVar = (this.props.signupSuccess == true || this.state.google==true) ? <Redirect to="/login" /> : null;
        return (
            <div>
                {redirectVar}
                <div style={{ width: "58%", float: "left" }} class="body">
                </div>
                {/* <Particles
                 params={particleOpt}/> */}
                {/* <div style={{width:"43%",height:"100%",float:"right",background:"rgb(20, 206, 190)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} > */}
                <div style={{ width: "42%", float: "right" }}>
                    <React.Fragment>
                        <div class="header">
                        <a style={{color:"blue"}} href="/" class="logo">HOME</a>
                            <div class="header-right">
                            </div>
                        </div>
                        {/* <div class="text"> */}
                        <div className="create">
                            <Form className="create-buyer" onSubmit={this.submitSignUp}>
                                <h3><span className="font-weight-bold">Create your account</span></h3>
                                <h4 className="text-centre">{this.props.message}</h4>
                                <FormGroup>
                                    <Label>First name</Label>
                                    <Input name="firstName" type="text" placeholder="First Name" required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last name</Label>
                                    <Input name="lastName" type="text" placeholder="Last Name" required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Age</Label>
                                    <Input name="age" type="text" placeholder="Age" required></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Gender</Label>
                                    <Input type="select" name="select" id="exampleSelect" required>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Others</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input name="emailId" type="email" placeholder="abc@example.com"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
                                    {/* <Input name="emailId" placeholder="abc@example.com" required></Input> */}
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input name="password" type="password"  placeholder="********" name="password" minlength="8" required></Input>
                                    {/* <Input name="password" type="password" placeholder="Password" name="password"
                                        required></Input> */}
                                </FormGroup>
                                <Button className="btn-lg btn-dark btn-block">Create your account</Button>
                            </Form>
                            <div className="text-center pt-3">Or continue wtih

                            <GoogleLogin
    clientId="986335033587-3sjcnb8lqm06tgkifhsc5bshipp9ldga.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
                        <div className="text-centre">
                                <h4>Have an account?</h4> <a style={{ fontSize: "19px", color: "black" }}
                                    href="/login">Sign in</a>
                                    </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </React.Fragment>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
