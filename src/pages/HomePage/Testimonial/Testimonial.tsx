import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './Testimonial.module.scss';
import OfferMenuSliderArrow from '../OfferMenu/OfferMenuSliderArrow';
import { Logo } from '../../../assets/images';

const settings = {
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <OfferMenuSliderArrow to="prev" />,
  nextArrow: <OfferMenuSliderArrow to="next" />,
};

const testimonials = [
  {
    id: 1,
    name: 'Joe Tran',
    job: 'Front-end Developer',
    tesimonial: 'Fantastic burgers! The prepared foods are delicious!',
  },
  {
    id: 2,
    name: 'Kathleen Rachel',
    job: 'Photographer',
    tesimonial:
      'Tried the raw vegan pizza today and LOVED it!!!! Soooo delicious!!',
  },
  {
    id: 3,
    name: 'Amy Allen',
    job: 'Saler',
    tesimonial:
      'Just fell in love with the pizzas! Can’t wait to try more Awesome Foods!! Thank you!!!',
  },
  {
    id: 4,
    name: 'Danny Garris',
    job: 'Musician',
    tesimonial:
      'Thank you for your food. It’s so fresh and delicious and it takes the work and guess-work out of my busy life when it comes to eating. Awesome Foods is AWESOME! You have a customer for life!',
  },
  {
    id: 5,
    name: 'Forrest Wilkes',
    job: 'Homemaker',
    tesimonial:
      'First bite in I knew I had to go back and get a few more for the weekend. Outstanding!!!',
  },
];

const cx = classNames.bind(styles);
function Testimonial() {
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <Slider {...settings} className={cx('slider')}>
          {testimonials.map((item) => (
            <div key={item.id}>
              <div className={cx('slide-inner')}>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className={cx('testimonial-icon')}
                />
                <p className={cx('testimonial')}>{item.tesimonial}</p>
                <p className={cx('name')}>{item.name}</p>
                <p className={cx('job')}>{item.job}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div className={cx('flashfood-logo')}>
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
