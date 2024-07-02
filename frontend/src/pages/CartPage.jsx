import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Image, ListGroup, Button, Alert, Form } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <Row>
        <Col md={8}>
          <h1 className="mb-3"> Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert variant="info">
              Your cart is empty
              <Link className="ms-2" to="/">
                <FaArrowLeft /> Go Back
              </Link>
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <span>{item.name}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
