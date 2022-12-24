import classNames from 'classnames/bind';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import styles from './ShowCountUp.module.scss';

const cx = classNames.bind(styles);
function ShowCountUp() {
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('count-item')}>
          <p className={cx('count-number')}>
            <CountUp end={100} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            +
          </p>
          <p className={cx('count-name')}>Oders per hour</p>
        </div>
        <div className={cx('count-item')}>
          <p className={cx('count-number')}>
            <CountUp end={1200} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            +
          </p>
          <p className={cx('count-name')}>Customers per day</p>
        </div>
        <div className={cx('count-item')}>
          <p className={cx('count-number')}>
            <CountUp end={80} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            %
          </p>
          <p className={cx('count-name')}>Positive feedbacks</p>
        </div>
        <div className={cx('count-item')}>
          <p className={cx('count-number')}>
            <CountUp end={5} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            +
          </p>
          <p className={cx('count-name')}>Events per month</p>
        </div>
      </div>
    </section>
  );
}

export default ShowCountUp;
