import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './ProductsSidebar.module.scss';
import { MENU_LIST } from '../../HomePage/OfferMenu/OfferMenu';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  clearFilters,
  setFilterPrice,
} from '../../../features/filters/filtersSlice';

const cx = classNames.bind(styles);

function ProductsSidebar() {
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.products);
  const {
    filters: { max_price, min_price, price },
  } = useAppSelector((state) => state.filters);

  const isClearFilterActive = price !== max_price
  
  const handleSetFilterByPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterPrice(+e.target.value));
  };
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
        <div className={cx('price-filter-container')}>
          <input
            type="range"
            min={min_price}
            max={max_price}
            value={price}
            className={cx('price-filter')}
            onChange={handleSetFilterByPrice}
          />
        </div>
        <div>
          Range: <span className={cx('price')}>${min_price}</span> -{' '}
          <span className={cx('price')}>${price}</span>
        </div>
      </div>
      <div className={cx('block')}>
        <button
          className={cx('clear-filters', isClearFilterActive && 'active')}
          onClick={() => dispatch(clearFilters())}
        >
          Clear filters
        </button>
      </div>
    </section>
  );
}

export default ProductsSidebar;
