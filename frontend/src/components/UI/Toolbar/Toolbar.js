import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const Toolbar = () => {
    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={RouterNavLink} to="/news" exact>News</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/news/new" >Add piece of news</NavLink>
                </NavItem>

            </Nav>
        </Navbar>
    );
};

export default Toolbar;