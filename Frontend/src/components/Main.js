import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import BuyerLayout from './Layout/BuyerLayout';
import Login from './Home/SignIn'
import SideBar from './Home/SideBar';
import option from './Home/option';
import LandingPage from './Home/LandingPage';
import Upload1 from './BuyerPages/Upload1';
import bmi from '../components/Charts/bmi'
import bmi2 from '../components/Charts/bmi2'
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/homeBuyer" component={BuyerLayout}/>
                <Route exact path="/" component={Navbar}/>
                <Route exact path="/land" component={LandingPage}/>
                <Route exact path="/bmi" component={bmi}/>
                <Route exact path="/chart" component={bmi2}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/sidebar" component={SideBar}/>
                <Route exact path="/option" component={option}/>
                <Route exact path="/upload" component={Upload1}/>
            </div>
        )
    }
}

//Export The Main Component
export default Main;