import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <CheckoutSteps step1 step2 step3 />
        <Col xs={12} md={6}>
          <h1>Payment</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="my-2">
              <Form.Label as="legend">Select Method</Form.Label>
              <Form.Check
                className="my-2"
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
