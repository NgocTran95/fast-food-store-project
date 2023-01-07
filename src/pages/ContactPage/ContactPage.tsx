import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './ContactPage.module.scss';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { ContactIcon } from '../../assets/images';

const cx = classNames.bind(styles);
function ContactPage() {
  return (
    <div className={cx('container')}>
      <Header />
      <div className={cx('contact-information')}>
        <h1 className={cx('heading')}>Contact Us</h1>
        <div className={cx('map')}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.0805711302455!2d108.20432766349766!3d16.00932072292208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421a3b4e8a83b9%3A0xd8bb071fa4aac29!2zQ-G6p3UgQ-G6qW0gTOG7hw!5e0!3m2!1svi!2s!4v1673080309812!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className={cx('help-infor')}>
          <div className={cx('contact-icon')}>
            <img src={ContactIcon} alt="contact-icon" />
          </div>
          <h2 className={cx('title')}>Need Help?</h2>
          <Container>
            <Row>
              <Col lg={4} md={12}>
                <h4 className={cx('info-title')}>phone</h4>
                <p className={cx('content')}>0328455399</p>
              </Col>
              <Col lg={4} md={12}>
                <h4 className={cx('info-title')}>custome service</h4>
                <p className={cx('content')}>Monday to Friday</p>
                <p className={cx('content')}>
                  7:00am – 5:00pm DaNang, Vietnam time (UTC +7)
                </p>
                <p className={cx('content')}>Saturday and Sunday closed</p>
              </Col>
              <Col lg={4} md={12}>
                <h4 className={cx('info-title')}>phone</h4>
                <p className={cx('content')}>
                  For information on Returns and Refunds, please click{' '}
                  <a href="https://www.youtube.com/">here</a>.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className={cx('question')}>
        <div className={cx('question-inner')}>
          <h2 className={cx('question-heading')}>Send Us Your Question!</h2>
          <p className={cx('message')}>
            We’ll get back to you within two days.
          </p>
          <form className={cx('question-form')}>
            <Row className="px-4">
              <Col lg={6}>
                <div className={cx('form-control')}>
                  <label htmlFor="full-name" className={cx('label')}>
                    Full name*
                  </label>
                  <input type="text" id="full-name" className={cx('input')} />
                </div>
              </Col>
              <Col lg={6}>
                <div className={cx('form-control')}>
                  <label htmlFor="full-email" className={cx('label')}>
                    Full Email*
                  </label>
                  <input type="email" id="full-email" className={cx('input')} />
                </div>
              </Col>
            </Row>
            <Row className="px-4">
              <Col lg={12}>
                <div className={cx('form-control')}>
                  <label htmlFor="full-message" className={cx('label')}>
                    Full Message*
                  </label>
                  <textarea
                    id="full-message"
                    className={cx('input', 'text-area')}
                  />
                </div>
              </Col>
            </Row>
            <button type="submit" className={cx('form-submit')}>
              submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
