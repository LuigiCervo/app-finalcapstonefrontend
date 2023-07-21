//External libs imports
import { useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
//Internal modules
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import DishDetails from "./pages/DishDetails";
import DishManager from "./pages/DishManager";
import User from "./dto/User";
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {

  const [authState, setAuthState] = useState<{ token: string, user: User } | null>(null);

  return (
    <main>
      <BrowserRouter basename='/'>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="mb-3 p-1 d-flex flex-row justify-content-between">
          <Container fluid="true d-flex w-100" >
            <Navbar.Brand className="mx-5"><img src="/img/logo.png" alt="logo continental" style={{ width: "200px", height: "100px" }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink className="mx-2 nav-link" to="/">Menu</NavLink>
                <NavLink className="mx-2 nav-link" to="/bundles">Bundles</NavLink>
                <NavLink className="mx-2 nav-link" to="/book">Book an appointment</NavLink>
              </Nav>

              {
                authState == null &&
                <Nav className="justify-self-end">
                  <NavLink className="mx-2 nav-link" to="/login">Log In</NavLink>
                  <NavLink className="mx-2 nav-link" to="/register">Register</NavLink>
                </Nav>
              }
              {
                authState != null &&
                <Nav className="justify-self-end">
                  <NavDropdown className="mx-2" title={authState.user.name} id="basic-nav-dropdown">
                    {
                      authState.user.admin &&
                      <NavDropdown.Item>Admin Account</NavDropdown.Item>
                    }
                    {
                      authState.user.golden &&
                      <NavDropdown.Item>Golden Account</NavDropdown.Item>
                    }
                  </NavDropdown>

                  <NavLink className="mx-2 nav-link" to="/logout">Log Out</NavLink>
                </Nav>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/dish/:id' element={<DishDetails />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setAuthStateAction={setAuthState} />} />
          <Route path='/logout' element={<Logout setAuthStateAction={setAuthState} />} />
          <Route path='/admin/dish' element={<DishManager />} />
        </Routes>
      </BrowserRouter>
    </main >
  );
}