import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './Products.module.scss';
const cx = classNames.bind(styles);
function Products() {
  return (
    <section className={cx('container')}>
      <Container className={cx('inner')}>
        <Row>
            <Col lg={3}>This is sidebar</Col>
            <Col lg={9}>This is productlist</Col>
        </Row>
      </Container>
    </section>
  );
}

export default Products;
