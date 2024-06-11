import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Card, Image, ListGroup, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import Rating from "../components/Rating";
// import products from '../products'

const ProductPage = () => {
  const {id: productId} = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const {data} = await axios.get('/api/products/'+productId);
      // console.log(data);
      setProduct(data);
    }
    getProduct()
  }, [productId])

  // const product = products.find((p) => p._id === productId)
  // console.log(product);

  return (
    <>
    <Link className='btn btn-light my-3' to='/'> <FaArrowLeft /> Go Back</Link>
    { product &&
    <Row>
        <Col md={5}>
        <Image src={product.image} alt={product.name} fluid />
        
        </Col>
        <Col md={4}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
                {product.description}
            </ListGroup.Item>
        </ListGroup>
            
        </Col>
        <Col md={3}>
              <Card className='mt-3'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
    </Row>}
    </>
  )
}

export default ProductPage