import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faUser,
  faBars,
  faTags,
  faAddressCard,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import styles from './Header.module.scss';
import logo from '../../assets/images/flash-food-logo.png';
import Avatar from '../Avatar';
import SideMenu from '../SideMenu';
import Cart from '../Cart';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';

const cx = classNames.bind(styles);
function Header() {
  const [user, setUser] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  return (
    <header className={cx('container')}>
      <div className={cx('inner')}>
        <nav className={cx('nav')}>
          <Link className={cx('logo')} to="/">
            <img className={cx('logo-image')} src={logo} alt="logo" />
          </Link>
          <ul className={cx('nav-bar')}>
            <li className={cx('nav-item')}>
              <Link to="/" className={cx('nav-link')}>
                Home
              </Link>
            </li>
            <li className={cx('nav-item')}>
              <Link to="/products" className={cx('nav-link')}>
                Oder Online
              </Link>
            </li>
            <li className={cx('nav-item')}>
              <Link to="/news" className={cx('nav-link')}>
                News
              </Link>
            </li>
            <li className={cx('nav-item')}>
              <Link to="/contact" className={cx('nav-link')}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <button className={cx('menu-btn')} onClick={() => setShowMenu(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={cx('logo-sm')}>
          <Link className={cx('logo')} to="/">
            <img className={cx('logo-image')} src={logo} alt="logo" />
          </Link>
        </div>
        <div className={cx('user-infor')}>
          <button className={cx('cart-btn')} onClick={() => setShowCart(true)}>
            <FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />
            {user && <span className={cx('cart-quantity')}>6</span>}
          </button>
          {user ? (
            <>
              <DropdownButton
                className={cx('drop-down')}
                title={
                  <div className={cx('user')}>
                    <Avatar
                      size={40}
                      url="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                      displayName="Tran Ngoc"
                    />
                    <p className={cx('user-name')}>Trần Ngọc</p>
                  </div>
                }
              >
                <Dropdown.Item>
                  <Link to="/profile" className={cx('menu-item')}>
                    <FontAwesomeIcon icon={faAddressCard} className={cx('menu-item-icon')}/>
                    My profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button className={cx('menu-item')}>
                    <FontAwesomeIcon icon={faTags} className={cx('menu-item-icon')}/>
                    My wish list
                  </button>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <button className={cx('menu-item', 'logout-btn')}>
                    <FontAwesomeIcon icon={faRightFromBracket} className={cx('menu-item-icon')}/>
                    Log out
                  </button>
                </Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            <Link className={cx('signin-btn')} to="/signin">
              <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
              Sign In
            </Link>
          )}
        </div>
      </div>
      <SideMenu show={showMenu} setShow={setShowMenu} />
      <Cart show={showCart} setShow={setShowCart} />
    </header>
  );
}

export default Header;
