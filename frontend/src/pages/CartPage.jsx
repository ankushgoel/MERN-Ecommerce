import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Image, ListGroup, Button, Alert, Form } from 'react-bootstrap';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';

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
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col className="row">
                      <Row>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Row>
                      {/* Quantity & Delete */}
                      <Row className="align-self-end">
                        <Col md={3} lg={2}>
                          <Form.Control as="select" value={item.qty} onChange={(e) => {}}>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option value={x + 1} key={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button type="button" variant="light">
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={1}>
                      <span>₹{item.price}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items): ₹
                  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" disabled={cartItems.length === 0}>
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
