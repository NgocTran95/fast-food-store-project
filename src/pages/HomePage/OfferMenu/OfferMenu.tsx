import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './OfferMenu.module.scss';
import OfferMenuSliderArrow from './OfferMenuSliderArrow';
import {
  OffferMenuBurger,
  OffferMenuBbq,
  OffferMenuChicken,
  OffferMenuDessert,
  OffferMenuDrink,
  OffferMenuPizza,
  OffferMenuPork,
  OffferMenuSanwich,
  OffferMenuSausage,
  OffferMenuSteak,
  OffferMenuBread,
} from '../../../assets/images/offer-menu-slider';

import {
  offerCombosBurger,
  offerCombosCombo,
  offerCombosPepsi,
  offerCombosSteak,
  offerCombosPizza,
  offerCombosChef,
} from '../../../assets/images/offer-menu-combos';
import Button from '../../../components/Button';

export const settings = {
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <OfferMenuSliderArrow to="prev" />,
  nextArrow: <OfferMenuSliderArrow to="next" />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const MENU_LIST = [
  {
    name: 'Burgers',
    to: '/products/burgers',
    image: OffferMenuBurger,
  },
  {
    name: 'Breads',
    to: '/products/breads',
    image: OffferMenuBread,
  },
  {
    name: 'BBQs',
    to: '/products/bbqs',
    image: OffferMenuBbq,
  },
  {
    name: 'Fried Chicken',
    to: '/products/fried-chicken',
    image: OffferMenuChicken,
  },
  {
    name: 'Pizzas',
    to: '/products/pizzas',
    image: OffferMenuPizza,
  },
  {
    name: 'Porks',
    to: '/products/porks',
    image: OffferMenuPork,
  },
  {
    name: 'Steaks',
    to: '/products/steaks',
    image: OffferMenuSteak,
  },
  {
    name: 'Sausages',
    to: '/products/sausages',
    image: OffferMenuSausage,
  },
  {
    name: 'Sandwiches',
    to: '/products/sandwiches',
    image: OffferMenuSanwich,
  },
  {
    name: 'Desserts',
    to: '/products/desserts',
    image: OffferMenuDessert,
  },
  {
    name: 'Drinks',
    to: '/products/drinks',
    image: OffferMenuDrink,
  },
];

const cx = classNames.bind(styles);
function OfferMenu() {
  return (
    <div className={cx('container')}>
      <div className={cx('inner')}>
        <Slider {...settings} className={cx('slider')}>
          {MENU_LIST.map((item, id) => (
            <div key={id}>
              <div className={cx('slide-inner')}>
                <Link to={item.to} className={cx('slide-thumbnail')}>
                  <div className={cx('slide-image')}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p className={cx('slide-name')}>{item.name}</p>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        <Container className={cx('combos')}>
          <Row className={cx('first-row')}>
            <Col lg={3} className={cx('combos-item', 'first-combo')}>
              <div className={cx('content')}>
                <h1 className={cx('combo-name')}>Big burger premium</h1>
                <p className={cx('combo-desc')}>
                  Start the day with a super yummy burger.
                </p>
                <p className={cx('combo-price')}>$10.00</p>
              </div>
              <div className={cx('bg-image')}>
                <img src={offerCombosBurger} alt="burger" />
              </div>
            </Col>
            <Col lg={5} className={cx('combos-item', 'second-combo')}>
              <div className={cx('content')}>
                <h1 className={cx('combo-name')}>Hot combo</h1>
                <p className={cx('combo-desc')}>
                  Enjoy your meal by the best and fast way.
                </p>
                <p className={cx('combo-price')}>$15.00</p>
              </div>
              <div className={cx('bg-image')}>
                <img src={offerCombosCombo} alt="combo" />
              </div>
            </Col>
            <Col lg={4} className={cx('combos-item', 'third-combo')}>
              <div className={cx('content')}>
                <h1 className={cx('combo-name')}>Pepsi</h1>
                <p className={cx('combo-desc')}>
                  Buy any 2 large pizzas and get a 1.5L Pepsi Free
                </p>
                <Button variants="outline" to="/products/pizzas">
                  Oder now
                </Button>
              </div>
              <div className={cx('bg-image')}>
                <img src={offerCombosPepsi} alt="pepsi" />
              </div>
            </Col>
          </Row>
          <Row className={cx('second-row')}>
            <Col lg={6} className={cx('combos-item', 'fourth-combo')}>
              <div className={cx('content')}>
                <h1 className={cx('combo-name')}>Beef Steaks</h1>
                <p className={cx('combo-desc')}>
                  More frend - more chill. Join with your friend to get discount
                  10% per oder.
                </p>
                <p className={cx('combo-price')}>$25.00</p>
              </div>
              <div className={cx('bg-image')}>
                <img src={offerCombosSteak} alt="steak" />
              </div>
            </Col>
            <Col lg={4} className={cx('combos-item', 'fifth-combo')}>
              <div className={cx('content')}>
                <h1 className={cx('combo-name')}>Hot Pizzas</h1>
                <p className={cx('combo-desc')}>
                  Exploding with delicious taste
                </p>
                <Button variants="outline" to="/products/pizzas">
                  Oder now
                </Button>
              </div>
              <div className={cx('bg-image')}>
                <img src={offerCombosPizza} alt="pizza" />
              </div>
            </Col>
            <Col lg={2} className={cx('combos-item', 'sixth-combo')}>
              <div className={cx('content')}>
                <h1 className={cx('combo-name')}>Explore more</h1>
                <p className={cx('combo-desc')}>
                  Order Your Favourite Food Today
                </p>
                <Button variants="primary" to="/products/best-foods">
                  Explore now
                </Button>
              </div>
              <div className={cx('bg-image')}>
                <img src={offerCombosChef} alt="chef" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default OfferMenu;
