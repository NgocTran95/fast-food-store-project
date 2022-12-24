import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import styles from './Navigation.module.scss';
import { menuSlideItems } from '../../HomePage/OfferMenu/OfferMenu';
import { settings } from '../../HomePage/OfferMenu/OfferMenu';

const cx = classNames.bind(styles);
function Navigation() {
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <h1 className={cx('heading')}>Shop</h1>
        <div className={cx('breadscrum')}>
            <Link to='/' className={cx('link')}>Home</Link> / Shop
        </div>
        <Slider {...settings} className={cx('slider')}>
          {menuSlideItems.map((item, id) => (
            <div key={id}>
              <div className={cx('slide-inner')}>
                <Link to={item.to} className={cx('slide-thumbnail')}>
                  <div className={cx('slide-image')}>
                    <img src={item.image} alt={item.name} />
                  </div>
                </Link>
                <p className={cx('slide-name')}>{item.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Navigation;
