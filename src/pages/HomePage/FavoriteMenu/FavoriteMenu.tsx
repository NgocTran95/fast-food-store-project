import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

import styles from './FavoriteMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getFeaturedProducts } from '../../../features/products/services';
import { paginateList } from '../../../utils/paginateList';
import Button from '../../../components/Button';
import SkeletonLoading from '../../../components/SkeletonLoading';

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
          <SkeletonLoading quantity={8} />
        ) : (
          <Slider {...settings}>
            {paginatedFeaturedProducts.map((products, index) => (
              <Container className={cx('menu')} key={index}>
                <Row>
                  {products.map((product) => (
                    <Col
                      sm={6}
                      lg={3}
                      className={cx('product-wrapper')}
                      key={product.id}
                    >
                      <div className={cx('product-inner')}>
                        <div className={cx('product-widget')}>
                          <div className={cx('widget-notification')}>
                            <div className={cx('widget-item', 'hot')}>Hot</div>
                            <div className={cx('widget-item', 'discount')}>
                              10%
                            </div>
                          </div>
                          <button className={cx('wishlist-btn', 'active')}>
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                        </div>
                        <div className={cx('product-thumbnail')}>
                          <img
                            src={product.img}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src =
                                'https://keviniscooking.com/wp-content/uploads/2021/05/Bavette-Steak-Sirloin-Flap-square.jpg';
                            }}
                            alt={product.name}
                          />
                        </div>
                        <div className={cx('product-info')}>
                          <p className={cx('product-name')}>{product.name}</p>
                          <p className={cx('product-price')}>
                            ${product.price}
                          </p>
                          <button className={cx('product-btn')}>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            ))}
          </Slider>
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
