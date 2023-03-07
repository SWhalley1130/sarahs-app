import React from "react";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import ship from "../images/ship.png";
import tree from "../images/tree.png";
import Nav from 'react-bootstrap/Nav';

function TopBar(props)
{
    return (
       <Nav className="topbar">
            <Container style={{display:'flex', gap:'2% 2%', alignItems:'center'}}>
                <NavLink to="/"><img className="ship-logo" src={tree}/></NavLink>
                {props.children}
            </Container>
       </Nav>
    )
}

export default TopBar;