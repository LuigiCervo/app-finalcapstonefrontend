//External libs imports
import { useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
//Internal modules
import Index from "./pages/Index";
import DishDetails from "./pages/DishDetails";
import Bundles from "./pages/Bundles";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import DishManager from "./pages/DishManager";
import User from "./dto/User";
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//Icons
import { Telephone } from "react-bootstrap-icons";
import { EnvelopeAt } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";
import ReservationPage from "./pages/ReservationPage";


export default function App() {

  const [authState, setAuthState] = useState<{ token: string, user: User } | null>(null);

  return (
    <main>
      <BrowserRouter basename='/'>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="mb-3 p-1 d-flex flex-row justify-content-between">
          <Container fluid="true d-flex w-100" >
            <Navbar.Brand className="mx-3">
              <Link to='/'>
                <img src="/img/logo.png" alt="logo continental" style={{ width: "200px", height: "100px" }} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {
                  authState != null &&
                  <NavLink className="mx-2 nav-link" to="/bundles">Bundles</NavLink>
                }
                <NavLink className="mx-2 nav-link" to="/book">Book an appointment</NavLink>
              </Nav>

              {
                authState === null &&
                <Nav className="justify-self-end">
                  <NavLink className="mx-2 nav-link" to="/login">Log In</NavLink>
                  <NavLink className="mx-2 nav-link" to="/register">Register</NavLink>
                </Nav>
              }
              {
                authState !== null &&
                <Nav className="justify-self-end">
                  <NavDropdown className="mx-2" title={authState.user.name} id="basic-nav-dropdown">
                    {
                      authState.user.admin &&
                      <NavDropdown.Item>Admin Account</NavDropdown.Item>
                    }
                    {
                      authState.user.admin &&
                      <NavDropdown.Item >
                        <NavLink to="/admin/dish">Admin Interface</NavLink>
                      </NavDropdown.Item>
                    }
                    {
                      authState.user.golden &&
                      <NavDropdown.Item>Golden Account</NavDropdown.Item>
                    }
                    {
                      !authState.user.golden && !authState.user.admin &&
                      <NavDropdown.Item>Standard Account</NavDropdown.Item>
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
          <Route path='/bundles' element={<Bundles authState={authState} />} />
          <Route path='/book' element={<ReservationPage authState={authState} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setAuthStateAction={setAuthState} />} />
          <Route path='/logout' element={<Logout setAuthStateAction={setAuthState} />} />
          <Route path='/admin/dish' element={<DishManager />} />
        </Routes>
      </BrowserRouter>


      <footer className="bg-dark w-100">
        <Container className="d-flex flex-wrap justify-content-around align-items-center py-2">
          <p className="col-md-4 mb-0 text-white">©2023 Continental Hotel NYC Inc.</p>

          <a className="col-md-4 d-flex align-items-center justify-content-center me-5 mb-3 mb-md-0 link-dark text-decoration-none">
            <img src="/img/logo_footer.png" height={300} />
          </a>
          <div className="d-flex justify-content-center w-25">
            <ul className="nav col-md-4 text-white w-100 flex-column ms-5">
              <li className="nav-item"><a className="nav-link px-2 text-white"><Telephone className="me-2"></Telephone>+1 8935712093</a></li>
              <li className="nav-item"><a className="nav-link px-2 text-white"><EnvelopeAt className="me-2"></EnvelopeAt>cont.hotelnyc@example.it</a></li>
              <li className="nav-item"><a className="nav-link px-2 text-white"><GeoAlt className="me-2"></GeoAlt>1 Wall Street Court</a></li>
            </ul>
          </div>
        </Container>

      </footer>
    </main >
  );
}