import { Row, Col, Alert } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';

const HomePage = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        // <h2>Loading...</h2>
        <Loader />
      ) : isError ? (
        <Alert variant="danger" dismissible>
          {error?.data?.message || error?.error}
        </Alert>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
