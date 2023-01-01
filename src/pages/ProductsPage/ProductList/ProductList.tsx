import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './ProductList.module.scss';
import CustomSelect from '../../../components/CustomSelect';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setPage, setDisplay } from '../../../features/filters/filtersSlice';
import GridProductView from './GridProductView';
import ListProductView from './ListProductView';

const SORT_OPTIONS = [
  { name: 'Default Sorting', value: 'default' },
  { name: 'Sort by average rating', value: 'rating' },
  { name: 'Sort by price: High to Low', value: 'price-des' },
  { name: 'Sort by price: Low to High', value: 'price-inc' },
  { name: 'Sort by from A to Z', value: 'a-z' },
  { name: 'Sort by from Z to A', value: 'z-a' },
];
const cx = classNames.bind(styles);

interface Props {
  currentFoodType: string;
}
export const PRODUCTS_PER_PAGE = 12;

function ProductList({ currentFoodType }: Props) {
  const dispatch = useAppDispatch();
  const { page, display, filtered_products } = useAppSelector((state) => state.filters);

  const productTotal = filtered_products.length;
  const pageTotal = Math.ceil(productTotal / PRODUCTS_PER_PAGE);
  const firstProductPosition = (page - 1) * PRODUCTS_PER_PAGE + 1;
  const lastProductPosition =
    page * PRODUCTS_PER_PAGE > productTotal
      ? productTotal
      : page * PRODUCTS_PER_PAGE;

  // Reset page when switch to other food
  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch, currentFoodType]);

  const scrollToView = () => {
    document.body.scrollTop = 500; // For Safari
    document.documentElement.scrollTop = 500; // For Chrome, Firefox, IE and Opera
  };

  const handleSwitchPage = (page: number) => {
    scrollToView();
    dispatch(setPage(page));
  };

  const handlePrevNextPage = (action: 'prev' | 'next') => {
    if (action === 'prev') {
      if (page === 1) return;
      dispatch(setPage(page - 1));
      scrollToView();
    } else {
      if (page === pageTotal) return;
      dispatch(setPage(page + 1));
      scrollToView();
    }
  };

  return (
    <section className={cx('container')}>
      <div className={cx('topbar')}>
        <p className={cx('count-item')}>
          Showing {firstProductPosition}-{lastProductPosition} of {productTotal}{' '}
          item(s)
        </p>
        <div className={cx('tools-bar')}>
          <div className={cx('display')}>
            <button
              className={cx('display-btn', display === 'grid' && 'active')}
              onClick={() => dispatch(setDisplay('grid'))}
            >
              <FontAwesomeIcon icon={faGrip} />
            </button>
            <button
              className={cx('display-btn', display === 'list' && 'active')}
              onClick={() => dispatch(setDisplay('list'))}
            >
              <FontAwesomeIcon icon={faListUl} />
            </button>
          </div>
          <CustomSelect optionArray={SORT_OPTIONS} />
        </div>
      </div>
      {display === 'grid' ? <GridProductView /> : <ListProductView />}
      <div className={cx('pagination')}>
        <button
          className={cx('pagination-btn', page === 1 && 'hide')}
          onClick={() => handlePrevNextPage('prev')}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {Array.from(Array(pageTotal).keys()).map((item) => (
          <button
            key={item}
            className={cx('pagination-btn', page === item + 1 && 'active')}
            onClick={() => handleSwitchPage(item + 1)}
          >
            {item + 1}
          </button>
        ))}
        <button
          className={cx('pagination-btn', page === pageTotal && 'hide')}
          onClick={() => handlePrevNextPage('next')}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}

export default ProductList;
