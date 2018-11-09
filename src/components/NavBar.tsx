import React from "react";
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
  DropdownItem
} from "reactstrap";

import { Link, NavLink as RNavLink } from "react-router-dom";

const styles = {
  navbarStyle: {
    boxShadow: "0 4px 6px 0 rgba(0,0,0,0.2)",
    background: "#FFF",
    zIndex: 10,
    fontWeight: 700
  }
};

type Props = {};

type State = {
  isOpen: boolean;
};

export default class Example extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar style={styles.navbarStyle} expand="md">
          <NavbarBrand tag={Link} to="/posts">
            <i className="fa fa-feed"></i>
          </NavbarBrand>

          <Nav className="" navbar>
            <NavItem>
              <p className="mb-0 text-purple">
                <i className="fa fa-file-text-o mr-1"></i>
                All Posts
              </p>
            </NavItem>
          </Nav>
          <NavbarToggler onClick={this.toggle}>
            <i className="fa fa-bars text-purple"></i>
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="" navbar>
              {/* <NavItem>
                <NavLink activeClassName="active" tag={RNavLink} to="/posts">
                  Feed
                </NavLink>
              </NavItem> */}
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/sheyooo/jobbot-code">
                  Source Code
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
