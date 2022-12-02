import classNames from 'classnames/bind';
import styles from './FoodTypes.module.scss';

const cx = classNames.bind(styles);
function FoodTypes() {
  return (
    <div className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <p className={cx('title')}>What do we serve?</p>
          <p className={cx('content')}>We have a huge menu to satisfy every taste</p>
        </div>
      </div>
    </div>
  );
}

export default FoodTypes;
