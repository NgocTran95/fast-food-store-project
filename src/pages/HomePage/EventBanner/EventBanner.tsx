import classNames from 'classnames/bind';
import styles from './EventBanner.module.scss';
import chickenChef from '../../../assets/images/chicken-chef.png';
import chickenDish from '../../../assets/images/fried-chicken-dish.png';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);
function EventBanner() {
  return (
    <div className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('main-block')}>
          <div className={cx('hero')}>
            <img src={chickenChef} alt="chicken-chef" />
            <div className={cx('widget')}>
              Sale off <span>30%</span>
            </div>
          </div>
          <div className={cx('infor')}>
            <div className={cx('content')}>
              <h3 className={cx('title')}>Hot news</h3>
              <h1 className={cx('event-name')}>Chicken Week</h1>
              <p className={cx('desc')}>Discount up to 30% per fried chicken oder</p>
            </div>
          </div>
        </div>
        <div className={cx('sub-block')}>
          <div className={cx('hero')}>
            <img src={chickenDish} alt="chicken-dish" />
          </div>
          <div className={cx('content')}>
            <p className={cx('time')}>Only from 01/12 to 07/12/2022</p>
            <p className={cx('details')}>Discount 5% per $50 of fried chiken oder, maximum 20%</p>
          </div>
          <p className={cx('especial-detail')}>Especially, up to 30% with oder directly at restaurant</p>
          <Button classNames={cx('oder-btn')} to="/products">
            Oder now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventBanner;
