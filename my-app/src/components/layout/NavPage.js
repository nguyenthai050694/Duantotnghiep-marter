import React, { useState } from 'react';

import {
    NavLink as Link
} from "react-router-dom";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';

// class Nav extends React.Component {
const NavPage = (args) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args} color="info" light expand="md" container='fluid' >
                <NavbarBrand>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/'  >WebLuTra</Link>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin'  >Admin</Link>
                        </NavItem>
                        <NavItem>
                            <Link style={{ textDecoration: 'none', color: 'black' ,marginLeft :'10px'}} to='/cart'>Cart</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin'  >Option 1</Link>
                                </DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar>
        </div >
    )
}

export default NavPage;