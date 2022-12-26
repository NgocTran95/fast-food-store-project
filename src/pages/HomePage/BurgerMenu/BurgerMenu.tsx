import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getBurgers } from '../../../features/products/services';
import {
  BurgerMenuTomatoes,
  BurgerMenuBurger,
} from '../../../assets/images/burger-menu';

import styles from './BurgerMenu.module.scss';
import BurgerMenuSkeletonLoading from './BurgerMenuSkeletonLoading';
const cx = classNames.bind(styles);
function BurgerMenu() {
  const dispatch = useAppDispatch();
  const { isLoading, burgerList } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getBurgers(10));
  }, [dispatch]);
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <div className={cx('widget')}>Tasty and Crunchy</div>
          <h1 className={cx('name')}>Special Burgers</h1>
          <p className={cx('desc')}>
            Inspired by recipes and creations of world’s best chefs
          </p>
        </div>
        {isLoading ? (
          <BurgerMenuSkeletonLoading quantity={10} />
        ) : (
          <Container>
            <Row>
              {burgerList.map((product) => (
                <Col lg={6} key={product.id}>
                  <div className={cx('product-inner')}>
                    <div className={cx('product-widget')}>
                      <div className={cx('widget-item', 'hot')}>Hot</div>
                      <div className={cx('widget-item', 'discount')}>10%</div>
                    </div>
                    <div className={cx('product-info')}>
                      <Link
                        className={cx('product-name')}
                        to={`/products/${product.id}`}
                      >
                        {product.name}
                      </Link>
                      <div className={cx('devider')}></div>
                      <p className={cx('product-price')}>${product.price}</p>
                    </div>
                    <p className={cx('product-desc')}>{product.dsc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
      <div className={cx('left-img')}>
        <img src={BurgerMenuBurger} alt="burger" />
      </div>
      <div className={cx('right-img')}>
        <img src={BurgerMenuTomatoes} alt="tomatoes" />
      </div>
    </section>
  );
}

export default BurgerMenu;
