import React from "react";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import ship from "../images/ship.png";
import Nav from 'react-bootstrap/Nav';

function TopBar()
{
    return (
       <Nav className="topbar">
            <NavLink to="/"><img className="ship-logo" src={ship}/></NavLink>
       </Nav>
    )
}

export default TopBar;