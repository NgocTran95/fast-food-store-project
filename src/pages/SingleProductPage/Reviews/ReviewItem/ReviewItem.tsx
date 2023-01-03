import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './ReviewItem.module.scss';
import AvatarIcon from '../../../../assets/images/avatar.svg';
import { ReviewData } from '../Reviews';
import { format } from 'date-fns';
const cx = classNames.bind(styles);
interface Props {
  review: ReviewData;
}
function ReviewItem({ review }: Props) {
  
  return (
    <div className={cx('container')}>
      <div className={cx('reviewer')}>
        <div className={cx('info')}>
          <div className={cx('avatar')}>
            <img src={AvatarIcon} alt="avatar" />
          </div>
          <div className={cx('details')}>
            <h4 className={cx('name')}>{review.name}</h4>
            {!!review.createAt &&<p className={cx('time')}>{format(new Date((review.createAt.seconds)*1000), 'MMMM dd, yyyy')}</p>}
          </div>
        </div>
        <div className={cx('rating')}>
          {Array.from(Array(review.rating).keys()).map((item) => (
            <FontAwesomeIcon
              icon={faStar}
              key={item}
              className={cx('product-rating-star')}
            />
          ))}
        </div>
      </div>
      <p className={cx('comment')}>
        {review.comment}
      </p>
    </div>
  );
}

export default ReviewItem;
