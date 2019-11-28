import React, {Component} from 'react';
import Iframe from 'react-iframe'

import Main from "../Main";

class Live extends Component {
    render() {
        return (<Iframe url="https://vizhub.healthdata.org/gbd-compare/"
                        width="100%"
                        height="650px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"/>)
    };
}
export default Live;