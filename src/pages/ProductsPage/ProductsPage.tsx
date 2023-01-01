import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './ProductsPage.module.scss';
import Header from '../../components/Header';
import Navigation from './Navigation';
import Footer from '../../components/Footer';
import ProductList from './ProductList';
import ProductsSidebar from './ProductsSidebar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { filterProducts, loadProducts, sortProducts } from '../../features/filters/filtersSlice';
import { getProducts, getPagination } from '../../features/products/services';

const cx = classNames.bind(styles);

interface Props {
  currentFoodType: string,
}

function ProductsPage({currentFoodType}: Props) {
  const dispatch = useAppDispatch()
  const { products, pagination } = useAppSelector(state => state.products)
  const { sort, filters } = useAppSelector(state => state.filters)
  
  // Get all dishes upon type
  useEffect(() => {
    dispatch(
      getProducts(currentFoodType),
    );
  }, [dispatch, currentFoodType]);

  // Get pagination 
  useEffect(() => {
    dispatch(getPagination());
    localStorage.setItem('pagination', JSON.stringify(pagination));
    // eslint-disable-next-line
  }, [dispatch]);

  // Load products to filterSlice
  useEffect(() => {
    dispatch(loadProducts(products))
  }, [dispatch,products])

  // Sort products
  useEffect(() => {
    dispatch(filterProducts())
    dispatch(sortProducts())
  }, [dispatch, products, sort.value, filters.price])
  

  return (
    <div>
      <Header />
      <Navigation currentFoodType={currentFoodType}/>
      <Container className={cx('products')}>
        <Row>
          <Col lg={3}>
            <ProductsSidebar/>
          </Col>
          <Col lg={9}>
            <ProductList currentFoodType={currentFoodType}/>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ProductsPage;
