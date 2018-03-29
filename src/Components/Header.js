import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'


class Header extends Component{
    onLogin(){
        this.props.onLogin();
    }
    onLogout(){
        this.props.onLogout();
    }
    render(){
        let result;
        if(this.props.idToken){
            result = <NavItem href="#" onClick={this.onLogout.bind(this)}>Log Out</NavItem>
        } else {
            result = <NavItem href="#" onClick={this.onLogin.bind(this)}>Log In</NavItem>
        }
        return(
            <Navbar className="navigation">
                <Navbar.Header>
                    <Navbar.Brand>
                        Github Searcher
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {result}
                </Nav>
            </Navbar>
        )
    }
}
export default Header;