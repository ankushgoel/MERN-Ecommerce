import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="mb-4 justify-content-center align-items-center">
      <Nav.Item>
        <Nav.Link
          className="checkout-step"
          disabled={`${step1 ? '' : 'true'}`}
          as={Link}
          to="/cart"
        >
          Cart
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className="checkout-step"
          disabled={`${step2 ? '' : 'true'}`}
          as={Link}
          to="/shipping"
        >
          Shipping
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className="checkout-step"
          disabled={`${step3 ? '' : 'true'}`}
          as={Link}
          to="/payment"
        >
          Payment
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link disabled={`${step4 ? '' : 'true'}`} as={Link} to="/placeorder">
          Place Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
