import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SignInBuyer from './Create/SignInBuyer';
import SignUpBuyer from './Create/SignUpBuyer';
import SignInOwner from './Create/SignInOwner';
import SignUpOwner from './Create/SignUpOwner';
import ProfileBuyer from './Profile/ProfileBuyer';
import ProfileOwner from './Profile/ProfileOwner';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import OwnerLayout from './Layout/OwnerLayout';
import BuyerLayout from './Layout/BuyerLayout';
import Login from './Home/SignIn'
import SideBar from './Home/SideBar';
import option from './Home/option';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/homeOwner" component={OwnerLayout}/>
                <Route path="/homeBuyer" component={BuyerLayout}/>
                <Route exact path="/" component={Navbar}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/sidebar" component={SideBar}/>
                <Route exact path="/option" component={option}/>
                <Route exact path="/signUpBuyer" component={SignUpBuyer}/>
                <Route exact path="/signInBuyer" component={SignInBuyer}/>
                <Route exact path="/signInOwner" component={SignInOwner}/>
                <Route exact path="/signUpOwner" component={SignUpOwner}/>
                <Route exact path="/profileBuyer" component={ProfileBuyer}/>
                <Route exact path="/profileOwner" component={ProfileOwner}/>
            </div>
        )
    }
}

//Export The Main Component
export default Main;