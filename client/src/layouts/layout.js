import React, {useContext} from 'react';
import { Routes, Route, Link, Navigate, useLocation} from "react-router-dom";
import {Navbar, Container, Nav, NavDropdown, NavItem } from 'react-bootstrap'
import {TodoContext} from "../store/TodoContext";
import Todos from "../pages/Todos";
import Login from "../pages/auth/Login";
import Resister from "../pages/auth/Register";
import axios from "axios";
import {setTokenInAxiosHeader} from "../helper/helper";


const Layout = () => {

    const {user, isAuthenticated, setIsAuthenticated} = useContext(TodoContext);

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    }

    return (
        <div>
            { isAuthenticated &&
                <header>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand className="fs-4"><Link to="/" className="text-black text-decoration-none fw-bold">Todo</Link></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav ">
                                <Nav className="me-auto">

                                </Nav>
                                <div className="">
                                    <NavDropdown title={user.firstName +' '+ user.lastName} className="user-name" id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
            }
            <div className="contents">
                <div className="container">
                    <Routes>
                        <Route path="/" element={ <RequireAuth><Todos /></RequireAuth>} />
                        <Route path="/login" element={<Auth><Login /></Auth>} />
                        <Route path="/register" element={<Auth><Resister /></Auth>} />
                    </Routes>
                </div>
            </div>

        </div>

    );
}

function RequireAuth({ children }) {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(TodoContext);
    let location = useLocation();

    if (!isAuthenticated) {

        const token = localStorage.getItem('token');
        setTokenInAxiosHeader(token);

        if (token){
            axios.get('/profile')
                .then(res => {
                    if (res.data.status){
                        setIsAuthenticated(true);
                        setUser(res.data.user);
                        return children;
                    }
                }).catch(err => {
                    return <Navigate to="/login" state={{ from: location }} replace />;
                })
        }else{
            return <Navigate to="/login" state={{ from: location }} replace />;
        }


    }

    return children;
}


function Auth({ children }) {
    const { isAuthenticated } = useContext(TodoContext);
    let location = useLocation();

    if (isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}


export default Layout;
