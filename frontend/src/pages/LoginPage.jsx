import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        throw new Error('Fill in all details before submitting!');
      }
      const res = await login({ email, password }).unwrap(); // Unwrap - extracts resolved value from Promise
      //   console.log(res);
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      console.log('error', err.message);
      toast.error(err?.data?.message || err?.message || err?.error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Login</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button disabled={isLoading} type="submit" variant="primary">
              Sign In
            </Button>
            <span style={{ float: 'right' }}>
              New Customer?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </span>

            {isLoading && <Loader />}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
