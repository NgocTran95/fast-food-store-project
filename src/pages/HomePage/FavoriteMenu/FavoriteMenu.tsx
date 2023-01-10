import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';

import styles from './FavoriteMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getFeaturedProducts } from '../../../features/products/services';
import Button from '../../../components/Button';
import GridProductCard from '../../../components/GridProductCard';
import GridProductCardSkeleton from '../../../components/GridProductCardSkeleton';

const cx = classNames.bind(styles);
function FavoriteMenu() {
  const dispatch = useAppDispatch();
  const { isLoading, featured_products } = useAppSelector(
    (state) => state.products,
  );
  useEffect(() => {
    dispatch(getFeaturedProducts(8));
  }, [dispatch]);

  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <div className={cx('widget')}>Tasty and Crunchy</div>
          <h1 className={cx('name')}>Favourite Menu</h1>
          <p className={cx('desc')}>
            Inspired by recipes and creations of world’s best chefs
          </p>
        </div>
        {isLoading ? (
          <Container className={cx('menu')}>
            <Row>
              {Array.from(Array(8).keys()).map((item) => (
                <GridProductCardSkeleton key={item} lg={3} md={6} />
              ))}
            </Row>
          </Container>
        ) : (
          <Container className="p-4">
            <Row>
              {featured_products.map((product) => (
                <GridProductCard
                  key={product.id}
                  product={product}
                  category="best-foods"
                  lg={3}
                  md={6}
                />
              ))}
            </Row>
          </Container>
        )}
        <Button
          to="products"
          variants="primary"
          className={cx('all-products-btn')}
        >
          All Products
        </Button>
      </div>
    </section>
  );
}

export default FavoriteMenu;
