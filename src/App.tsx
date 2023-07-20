import { BrowserRouter, Route, Routes } from "react-router-dom";
import DishManager from "./pages/DishManager";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Index } from "./pages/Index";
import DishDetails from "./pages/DishDetails";

function App() {
  return (
    <main>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="mb-3 p-1 d-flex flex-row justify-content-between">
        <Container fluid="true d-flex w-100" >
          <Navbar.Brand className=" mx-5" href="#home"><img src="/img/logo.png" alt="logo continental" style={{ width: "200px", height: "100px" }} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Nav.Link className="mx-2" href="#home">Menu</Nav.Link>
              <Nav.Link className="mx-2" href="#link">Promozioni</Nav.Link>
              <NavDropdown className="mx-2" title="Scopri di più" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Prenota un appuntamento</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Modifica menu</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Nav className="d-flex align-items-center" >
            <Nav.Link className="" href="#home"><u>Effettua il Log-in</u></Nav.Link>
            <p className=" text-secondary d-flex align-items-center justify-content-center h-100 m-0">|</p>
            <Nav.Link className=" me-4" href="#link"><u>Registrati</u></Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/dish/:id' element={<DishDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/dish' element={<DishManager />} />
        </Routes>
      </BrowserRouter>
    </main >
  );
}

export default App;
