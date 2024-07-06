import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutApi().unwrap(); // Unwrap - extracts resolved value from Promise
      // console.log(res);
      dispatch(logout(res));
      navigate('/');
    } catch (err) {
      console.log('error', err.message);
      toast.error(err?.data?.message || err?.message || err?.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            MERN Ecom
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: '4px' }}>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown id="username" title={userInfo.firstName}>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
