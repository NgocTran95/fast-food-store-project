import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { Logo } from '../../assets/images';
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import styles from './Footer.module.scss';
const cx = classNames.bind(styles);
function Footer() {
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <Container>
          <Row>
            <Col lg={3} className={cx('col')}>
              <div className={cx('logo')}>
                <img src={Logo} alt="logo" />
              </div>
            </Col>
            <Col lg={6} className={cx('col')}>
              <span className={cx('devider')}></span>
            </Col>
            <Col lg={3} className={cx('col', 'third')}>
              <ul className={cx('social-links')}>
                <li>
                  <a
                    href="https://www.facebook.com/laoyeu.ngannam.790/"
                    className={cx('social-link')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/"
                    className={cx('social-link')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className={cx('social-link')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    className={cx('social-link')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col lg={3}></Col>
            <Col lg={3}>
              <div className={cx('contact-col')}>
                <h3 className={cx('header')}>book a table</h3>
                <p className={cx('desc')}>Save time with proper planning</p>
                <h1 className={cx('phone')}>0328.455.399</h1>
              </div>
            </Col>
            <Col lg={3}>
              <div className={cx('contact-col')}>
                <h3 className={cx('header')}>newletter</h3>
                <p className={cx('desc')}>
                  Newsletter Exclusive Discount codes
                </p>
                <div className={cx('email')}>
                  <input
                    type="email"
                    className={cx('email-input')}
                    placeholder="Your email..."
                  />
                  <button type="submit">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={cx('devider', 'single')}></div>
        <ul className={cx('info-links')}>
          <li className={cx('info-item')}>
            <a
              className={cx('info-link')}
              href="https://www.facebook.com/laoyeu.ngannam.790/"
              target="_blank"
              rel="noreferrer"
            >
              Fast food store
            </a>
          </li>
          <li className={cx('info-item')}>
            <a
              className={cx('info-link')}
              href="https://www.facebook.com/laoyeu.ngannam.790/"
              target="_blank"
              rel="noreferrer"
            >
              76 Cống Quỳnh, Cẩm Lệ
            </a>
          </li>
          <li className={cx('info-item')}>
            <a
              className={cx('info-link')}
              href="https://www.facebook.com/laoyeu.ngannam.790/"
              target="_blank"
              rel="noreferrer"
            >
              ngoctranbk95@gmail.com
            </a>
          </li>
          <li className={cx('info-item')}>
            <a
              className={cx('info-link')}
              href="https://www.facebook.com/laoyeu.ngannam.790/"
              target="_blank"
              rel="noreferrer"
            >
              Phone:(+84)328455399
            </a>
          </li>
        </ul>
        <div className={cx('widget')}>
            <h2 className={cx('content')}>
                Copyright © 2022 Fast food Created by Joe
            </h2>
        </div>
      </div>
    </section>
  );
}

export default Footer;
