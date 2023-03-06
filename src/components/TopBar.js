import React from "react";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import ship from "../images/ship.png";
import Nav from 'react-bootstrap/Nav';

function TopBar(props)
{
    return (
       <Nav className="topbar">
            <Container>
                <NavLink to="/"><img className="ship-logo" src={ship}/></NavLink>
                {props.children}
            </Container>
       </Nav>
    )
}

export default TopBar;