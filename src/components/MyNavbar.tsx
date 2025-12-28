import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../Routes';

function MyNavbar() {
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
                    </Nav>
                    <Nav>
                        <Navbar.Text className="text-white fw-bold">
                            Калькулятор карбонатов
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;