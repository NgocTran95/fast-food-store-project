import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import styles from './ProductsSidebar.module.scss';
import { MENU_LIST } from '../../HomePage/OfferMenu/OfferMenu';
import DoubleRangeSlider from '../../../components/DoubleRangeSlider';
import { useAppSelector } from '../../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProductsSidebar() {
  const { pagination } = useAppSelector((state) => state.products);

  return (
    <section className={cx('container')}>
      <div className={cx('block')}>
        <h3 className={cx('heading')}>categories</h3>
        {MENU_LIST.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              isActive ? cx('item', 'active') : cx('item')
            }
          >
            <p className={cx('title')}>{item.name}</p>
            <div className={cx('count')}>
              {pagination[item.to.split('/')[2]]}
            </div>
          </NavLink>
        ))}
      </div>
      <div className={cx('block')}>
        <h3 className={cx('heading')}>price</h3>
        <DoubleRangeSlider
          min={0}
          max={100}
          onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
        />
      </div>
      <div className={cx('block')}>
        <h3 className={cx('heading')}>rating filter</h3>
        <Form>
          <Form.Check>
            <Form.Check.Input
              type="radio"
              name="rating"
              id="rating-5-stars"
              className={cx('rating-radio-input')}
            />
            <Form.Check.Label
              htmlFor="rating-5-stars"
              className={cx('rating-radio-label')}
            >
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </Form.Check.Label>
          </Form.Check>
          <Form.Check>
            <Form.Check.Input
              type="radio"
              name="rating"
              id="rating-4-stars"
              className={cx('rating-radio-input')}
            />
            <Form.Check.Label
              htmlFor="rating-4-stars"
              className={cx('rating-radio-label')}
            >
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </Form.Check.Label>
          </Form.Check>
          <Form.Check>
            <Form.Check.Input
              type="radio"
              name="rating"
              id="rating-3-stars"
              className={cx('rating-radio-input')}
            />
            <Form.Check.Label
              htmlFor="rating-3-stars"
              className={cx('rating-radio-label')}
            >
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </Form.Check.Label>
          </Form.Check>
        </Form>
      </div>
    </section>
  );
}

export default ProductsSidebar;
