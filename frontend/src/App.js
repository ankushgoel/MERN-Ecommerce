import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './components/Product';
import products from './products';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
