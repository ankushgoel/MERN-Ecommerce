import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Row, Col, Card, Image, ListGroup, Alert, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

import { toCurrency } from '../utils/cartUtils';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import Loader from '../components/Loader';

const OrderPage = () => {
  // const { userInfo } = useSelector((state) => state.auth);

  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, isError, error } = useGetOrderDetailsQuery(orderId);
  // console.log(order);
  const {
    data: paypal,
    isLoading: loadingPaypalClient,
    error: errorPaypalClient,
  } = useGetPayPalClientIdQuery();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation(orderId);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!errorPaypalClient && !loadingPaypalClient && paypal?.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, errorPaypalClient, loadingPaypalClient, paypalDispatch]);

  async function onApproveTest() {
    await payOrder({ orderId, details: {} });
    refetch();
    toast.success('Payment Successful!');
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      console.log(details);
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment Successful!');
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: Math.round(order.totalPrice / 84) },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    console.log(err?.data?.message || err?.message);
    toast.error('Some error occured!');
  }

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
          <h1>
            Order Details <span style={{ fontSize: '0.75rem' }}>{order._id}</span>
          </h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.firstName}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Alert variant="success">Delivered on {order.deliveredAt}</Alert>
                  ) : (
                    <Alert variant="danger">Not Delivered</Alert>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Alert>Order is empty</Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {toCurrency(item.price)} ={' '}
                              {toCurrency(item.qty * item.price)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2 className="m-0">Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item className="pb-1 border-0">
                    <Row>
                      <Col>Items Price</Col>
                      <Col>{toCurrency(order.itemsPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-1 border-0">
                    <Row>
                      <Col>Shipping</Col>
                      <Col>{toCurrency(order.shippingPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="pt-1">
                    <Row>
                      <Col>Total</Col>
                      <Col>{toCurrency(order.totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  {/* PAY ORDER */}
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <div>
                          {/* <Button onClick={onApproveTest}>Test Pay Order</Button> */}
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>{' '}
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                  {/* {ADMIN MARK AS DELIVERED PLACEHOLDER} */}
                </ListGroup>
              </Card>

              <Card className="mt-4">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Payment Details</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Alert variant="success">Paid on {order.paidAt}</Alert>
                    ) : (
                      <Alert variant="danger">Not Paid</Alert>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderPage;
