import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

import { Image, Menu } from 'semantic-ui-react'

// import Especialidades from './especialidade/Especialidades';
// import Medicos from './medico/Medicos';
import logo from '../../img/cardiogram.png';
import '../../styles/Sidebar.css';
import med1 from '../../images/medi4.jpeg';

class SideBar extends Component {

  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div className="App">
        <div className="App-header">  
          <div className="App-title">
            <div className="App-title-logo">
              <Link to="/">
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
            </div>
            <h2>Medi Report</h2>
          </div>
        </div>

        <div className="App-content">
          <div className="App-menu">
            <Menu icon='labeled' vertical>
              <Menu.Item 
                name='home' 
                active={activeItem === 'home'} 
                onClick={this.handleItemClick} 
                as={NavLink} to='/'>
                <Image className="App-menu-image" src={med1} />
                <span className="App-menu-label">Home</span>
              </Menu.Item>
              
              <Menu.Item 
                name='medicos' 
                active={activeItem === 'medicos'} 
                onClick={this.handleItemClick} 
                as={NavLink} to='/medicos'>
                <Image className="App-menu-image" src={med1} />
                <span className="App-menu-label">Report</span>
              </Menu.Item>

              <Menu.Item 
                name='clinicas' 
                active={activeItem === 'clinicas'} 
                onClick={this.handleItemClick} 
                as={NavLink} to='/clinicas'>
                <Image className="App-menu-image" src={med1} />
                <span className="App-menu-label">Summary</span>
              </Menu.Item>

              <Menu.Item 
                name='especialidades' 
                active={activeItem === 'especialidades'} 
                onClick={this.handleItemClick} 
                as={NavLink} to='/home'>
                <Image className="App-menu-image" src={med1} />
                <span className="App-menu-label">Signout</span>
              </Menu.Item>
            </Menu>
          </div>
{/* 
          <div className="App-container">
            <Route path="/especialidades" component={Especialidades} />
            <Route path="/medicos" component={Medicos} />
          </div> */}
        </div>
      </div>
    );
  }
}

export default SideBar;
 