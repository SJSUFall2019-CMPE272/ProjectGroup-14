import React, {Component} from 'react';
import { Form,Button,FormGroup,Label,Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import '../../styles/Navbar.css';
// import FormPage from './FormPage.js'
import {signUpMongo,facebookAuth,googleAuth} from "../../js/actions/accessActions";
import {connect} from "react-redux";

function mapStateToProps(store) {
  return {
      signupSuccess: store.account.signupSuccess,
      signupMessage: store.account.signupMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
      submitSignUp: (book) => dispatch(signUpMongo(book)),
      facebookAuth: dispatch(facebookAuth),
      googleAuth : dispatch(googleAuth)
  };
}


class Navbar extends Component {
    constructor(props) {
        super(props);
    //maintain the state required for this component
    this.submitSignUp = this.submitSignUp.bind(this);
    this.facebookAuth = this.facebookAuth.bind(this);
    this.googleAuth = this.googleAuth.bind(this);
  }
//   submitSignUp(e) {
//     let data = {
//       'first' : null,
//       'last' : null,
//       'email' : null,
//       'password' : null,
//       'type':"buyer" 
//     }
//     e.preventDefault(); 
//     data.first = (e.target[0].value);
//     data.last = (e.target[1].value);
//     data.email = (e.target[2].value);
//     data.password = (e.target[3].value);
//     console.log("insumbitsign in ", data);
//     this.props.signup(data);
// }

facebookAuth = () => {
    this.props.facebookAuth();
 
};

googleAuth = () => {
 this.props.googleAuth();
 
};

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

    console.log("signUpBuyer data")
    console.log(data)

    this.props.signUpBuyer({"user": data});
};
    render() {
        return (
	  <div class="body">
				 {/* <Particles 
				 params={particleOpt}/> */}
				 <React.Fragment>
      <div>
	   <div class="text">
      <div className="create">
          <Form className="create-buyer" onSubmit={this.submitSignUp}>
            <h3><span className="font-weight-bold">Create your account</span></h3>
            <h4 className="text-centre">{this.props.message}</h4>
            <FormGroup>
              <Label>First name</Label>
              <Input name="first" type="text" placeholder="First Name" required></Input>
              </FormGroup>
              <FormGroup>
              <Label>Last name</Label>
              <Input name="last" type="text" placeholder="Last Name" required></Input>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="abc@example.com"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="Password" name="password" minlength="8" required></Input>
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block">Create your account</Button> 
          </Form>
          <div className="text-center pt-3">Or continue wtih</div>
            <FacebookLoginButton onClick={this.facebookAuth}/>
            <GoogleLoginButton onClick={this.googleAuth}/>
            <div className="text-centre">
            <h4>Have an account?</h4> <a style={{fontSize:"19px",color:"black"}} href="/login">Sign in</a>
            </div>
		  </div>
      </div>
      </div>
      </React.Fragment>
	  
              </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
