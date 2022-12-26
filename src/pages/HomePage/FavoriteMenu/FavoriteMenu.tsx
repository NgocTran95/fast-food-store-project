import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import { useEffect } from 'react';

import styles from './FavoriteMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getFeaturedProducts } from '../../../features/products/services';
import { paginateList } from '../../../utils';
import Button from '../../../components/Button';
import ProductCard from '../../../components/ProductCard';
import ProductCardSkeletonLoading from '../../../components/ProductCardSkeletonLoading';

const settings = {
  autoplay: true,
  autoplaySpeed: 3500,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const cx = classNames.bind(styles);
function FavoriteMenu() {
  const dispatch = useAppDispatch();
  const { isLoading, featuredProducts } = useAppSelector(
    (state) => state.products,
  );
  useEffect(() => {
    dispatch(getFeaturedProducts(30));
  }, [dispatch]);

  const paginatedFeaturedProducts = paginateList(featuredProducts, 8);
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
              {
                Array.from(Array(8).keys()).map(item => (
                  <ProductCardSkeletonLoading key={item} lg={3} sm={6}/>
                ))
              }
            </Row>
          </Container>
        ) :(
        <Slider {...settings}>
          {paginatedFeaturedProducts.map((products, index) => (
            <Container className={cx('menu')} key={index}>
              <Row>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lg={3}
                    sm={6}
                    isActive={false}
                  />
                ))}
              </Row>
            </Container>
          ))}
        </Slider>)}
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
