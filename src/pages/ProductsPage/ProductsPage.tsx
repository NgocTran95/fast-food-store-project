import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './ProductsPage.module.scss';
import Header from '../../components/Header';
import Navigation from './Navigation';
import Footer from '../../components/Footer';
import ProductList from './ProductList';
import ProductsSidebar from './ProductsSidebar';

const cx = classNames.bind(styles);
function ProductsPage() {
  return (
    <div>
      <Header />
      <Navigation />
      <Container className={cx('products')}>
        <Row>
          <Col lg={3}>
            <ProductsSidebar />
          </Col>
          <Col lg={9}>
            <ProductList/>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ProductsPage;
