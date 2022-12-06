import classNames from 'classnames/bind';
import styles from './BestChoices.module.scss';

const cx = classNames.bind(styles);
function BestChoices() {
  return (
    <div className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          Choose your favor
        </div>
      </div>
    </div>
  );
}

export default BestChoices;
