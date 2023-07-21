import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import DishManager from "./pages/DishManager";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Index } from "./pages/Index";
import DishDetails from "./pages/DishDetails";
import './App.css';
import { useState } from "react";

function App() {

  const [token, setToken] = useState<any | null>(null);

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
                <NavLink className="mx-2 nav-link" to="/bundles">Promozioni</NavLink>
                <NavDropdown className="mx-2" title="Scopri di più" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Prenota un appuntamento</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Modifica menu</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav className="justify-self-end">
                <NavLink className="mx-2 nav-link" to="/login">LogIn</NavLink>
                <NavLink className="mx-2 nav-link" to="/register">Register</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/dish/:id' element={<DishDetails />} />
          <Route path='/login' element={<Login setTokenAction={setToken} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/dish' element={<DishManager />} />
        </Routes>
      </BrowserRouter>
    </main >
  );
}

export default App;
