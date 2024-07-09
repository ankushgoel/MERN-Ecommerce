import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const ShippingPage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="my-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="my-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode" className="my-2">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="my-2">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
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

export default ShippingPage;
