import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Kezdolap from "./sajatosztalyok/Kezdolap";
import Sorozatok from "./sajatosztalyok/Sorozatok";
import Adattorles from "./sajatosztalyok/Adattorles";
import Keresestorles from "./sajatosztalyok/Keresestorles";
import Felvitel from "./sajatosztalyok/Felvitel";
import Filmek from "./sajatosztalyok/Filmek";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Nezettseg from "./sajatosztalyok/Nezettseg";
import Ajanlas from "./sajatosztalyok/Ajanlas"





class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (

      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/kezdolap">Kezdőoldal</Nav.Link>
          <Nav.Link href="/sorozatok">Sorozatok</Nav.Link>
          <Nav.Link href="/filmek">Filmek</Nav.Link>
          <Nav.Link href="/ajanlas">Ajánlás</Nav.Link>

          {showAdminBoard && (
          <NavDropdown title="Admin" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/adattorles">Adattörlés</NavDropdown.Item>
            <NavDropdown.Item href="/keresestorles">Keresés törlés</NavDropdown.Item>
            <NavDropdown.Item href="/Felvitel">Felvitel</NavDropdown.Item>
            <NavDropdown.Item href="/Nezettseg">Nézettség</NavDropdown.Item>

          </NavDropdown>
            )}
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Kilépés
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Belépés
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Regisztráció
                </Link>
              </li>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        





        

        <div className="">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Kezdolap" component={Kezdolap} />
            <Route path="/Sorozatok" component={Sorozatok} />
            <Route path="/Adattorles" component={Adattorles} />
            <Route path="/Keresestorles" component={Keresestorles} />
            <Route path="/Felvitel" component={Felvitel} />
            <Route path="/Filmek" component={Filmek} />
            <Route path="/Nezettseg" component={Nezettseg} />
            <Route path="/Ajanlas" component={Ajanlas} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;