import React, {Component} from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter, Route} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

//App Component
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={Main}/>
            </BrowserRouter>
        );
    }
}

//Export the App component so that it can be used in accountReducer.js
export default App;
