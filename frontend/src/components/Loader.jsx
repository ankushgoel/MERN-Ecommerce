import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        display: 'block',
        width: '100px',
        height: '100px',
        margin: 'auto',
      }}
    />
  );
};

export default Loader;
