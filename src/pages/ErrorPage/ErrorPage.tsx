import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import styles from './ErrorPage.module.scss';
const cx = classNames.bind(styles);
function ErrorPage() {
  return (
    <section>
      <Header />
      <div className={cx('body')}>
        <div className={cx('inner')}>
          <h1 className={cx('heading')}>404</h1>
          <p className={cx('sub-heading')}>Oops! That page can't be found.</p>
          <p className={cx('desc')}>
            We're really sorry but we can't seem to find the page you were looking
            for.
          </p>
          <Link to="/" className={cx('back-home-btn')}>
            back the home <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default ErrorPage;
