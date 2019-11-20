import React, {Component} from 'react';
import { Form,Button,FormGroup,Label,Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import '../../styles/Navbar.css';
// import FormPage from './FormPage.js'



class Navbar extends Component {
    constructor(props) {
        super(props);
    }

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
            <div className="text-center pt-3">Or continue wtih</div>
            <FacebookLoginButton/>
            <GoogleLoginButton/>
            <div className="text-centre">
            <span>Have an account?</span> <a href="/login">Sign in</a>
            </div> 
          </Form>
		  </div>
      </div>
      </div>
      </React.Fragment>
	  
              </div>
        )
    }
}

export default Navbar;
