import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="mb-4 justify-content-center align-items-center">
      <Nav.Item>
        <Nav.Link className="checkout-step" disabled={`${step1 ? '' : 1}`} as={Link} to="/cart">
          Cart
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="checkout-step" disabled={`${step2 ? '' : 1}`} as={Link} to="/shipping">
          Shipping
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="checkout-step" disabled={`${step3 ? '' : 1}`} as={Link} to="/payment">
          Payment
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link disabled={`${step4 ? '' : 1}`} as={Link} to="/place-order">
          Place Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
