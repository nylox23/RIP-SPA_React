import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { logoutUser } from '../slices/authSlice';
import { useEffect } from 'react';
import { getProfile } from '../slices/authSlice';
import { fetchCurrentCarbonateInfo } from '../slices/carbonateSlice';

function MyNavbar() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getProfile());
            dispatch(fetchCurrentCarbonateInfo());
        }
    }, [isAuthenticated, dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate(ROUTES.LOGIN);
    };

    return (
        <Navbar className="navbar-custom" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={ROUTES.HOME} className="btn-home me-3">
                    ⌂ Домой
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={ROUTES.ACIDS}>{ROUTE_LABELS.ACIDS}</Nav.Link>
                        {isAuthenticated && (
                            <Nav.Link as={Link} to={ROUTES.CARBONATE_LIST}>{ROUTE_LABELS.CARBONATE_LIST}</Nav.Link>
                        )}
                    </Nav>

                    <Nav className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 gap-lg-3 mt-3 mt-lg-0">
                        {isAuthenticated ? (
                            <>
                                <Navbar.Text className="text-white">
                                    Привет, <Link to={ROUTES.PROFILE} className="text-white fw-bold" style={{textDecoration: 'none'}}>{user?.login}</Link>
                                </Navbar.Text>
                                <Button variant="outline-light" size="sm" onClick={handleLogout} className="w-100 w-lg-auto">
                                    Выход
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to={ROUTES.LOGIN} className="px-0">Вход</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;