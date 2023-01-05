import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  collection,
  where,
  orderBy,
  Query,
  DocumentData,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ReviewItem from './ReviewItem';
import styles from './Reviews.module.scss';
import { validateReviewSchema } from '../../../validateForm/validateSchema';
import { createReview } from '../../../features/single_product/services';
import { Review } from '../../../features/single_product/services';
import { db } from '../../../firebase/config';
import { setReviews } from '../../../features/single_product/singleProductSlice';
const cx = classNames.bind(styles);

interface ReviewInput {
  name: string;
  email: string;
  comment: string;
}

export interface ReviewData extends Review {
  createAt: { seconds: number };
}

function Reviews() {
  const dispatch = useAppDispatch();
  const { single_product, isSentReviewSuccess, reviews } = useAppSelector(
    (state) => state.single_product,
  );
  const { userInfo } = useAppSelector((state) => state.user);
  const [rating, setRating] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: yupResolver(validateReviewSchema),
  });

  // Get reviews
  useEffect(() => {
    const collectionRef: Query<DocumentData> = query(
      collection(db, 'reviews'),
      where('uid', '==', single_product.id),
      orderBy('createAt', 'asc'),
    );
    const unscribed = onSnapshot(collectionRef, (snapshot) => {
      const documents: ReviewData[] = snapshot.docs.map((doc) => ({
        uid: doc.data().uid,
        name: doc.data().name,
        email: doc.data().email,
        comment: doc.data().comment,
        rating: doc.data().rating,
        createAt: doc.data().createAt,
      }));
      dispatch(setReviews(documents));
    });
    return () => {
      unscribed();
    };
  }, [dispatch, single_product.id]);

  const handleSubmitReview = (data: ReviewInput) => {
    if (rating === 0) return;
    const reviewData = { uid: single_product.id, rating, ...data };
    dispatch(createReview(reviewData));
  };
  return (
    <section className={cx('container')}>
      <header className={cx('heading')}>
        <p>Reviews</p>
      </header>
      {reviews.length === 0 ? (
        <p className={cx('no-review-notification')}>There are no review yet.</p>
      ) : (
        <div className={cx('reviews')}>
          <p className={cx('notification')}>
            {reviews.length} review(s) for{' '}
            <span className={cx('product-name')}>{single_product.name}</span>
          </p>
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </div>
      )}
      {!userInfo.uid ? (
        <div className={cx('not-login')}>
          <p className={cx('notification')}>You are not logged in. Please log in to use this feature!</p>
          <Link to='/login' className={cx('navigate-login-btn')}>Go to Login</Link>
        </div>
      ) : (
        <>
          {isSentReviewSuccess ? (
            <div className={cx('review-success')}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={cx('success-icon')}
              />
              Sent your review successfully!
            </div>
          ) : (
            <div className={cx('response')}>
              <div className={cx('title')}>
                <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                add a review
              </div>
              <form
                className={cx('res-form')}
                onSubmit={handleSubmit(handleSubmitReview)}
              >
                <p className={cx('notification')}>
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <div className={cx('rating')}>
                  <p className={cx('label')}>Your rating:</p>
                  <div className={cx('stars')}>
                    {Array.from(Array(5).keys()).map((item) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        key={item}
                        className={cx(
                          'product-rating-star',
                          item + 1 <= rating && 'active',
                        )}
                        onClick={() => setRating(item + 1)}
                      />
                    ))}
                  </div>
                  <p className={cx('rating-msg')}>
                    {rating === 0 && '(Choose your rating)'}
                  </p>
                </div>
                <div className={cx('form-info')}>
                  <Row className={cx('form-info-inner')}>
                    <Col lg={6} className={cx('col')}>
                      <Row className={cx('row')}>
                        <input
                          type="text"
                          placeholder="Name *"
                          className={cx('form-control')}
                          {...register('name')}
                        />
                        <p className={cx('error-msg')}>
                          {errors.name?.message}
                        </p>
                      </Row>
                      <Row className={cx('row')}>
                        <input
                          type="email"
                          placeholder="Email *"
                          className={cx('form-control')}
                          {...register('email')}
                        />
                        <p className={cx('error-msg')}>
                          {errors.email?.message}
                        </p>
                      </Row>
                      <Row className={cx('row')}>
                        <input
                          type="submit"
                          value="submit"
                          className={cx('form-control', 'submit-btn')}
                        />
                      </Row>
                    </Col>
                    <Col lg={6} className={cx('col')}>
                      <textarea
                        placeholder="Your review *"
                        className={cx('comment')}
                        {...register('comment')}
                      />
                      <p className={cx('error-msg')}>
                        {errors.comment?.message}
                      </p>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Reviews;
