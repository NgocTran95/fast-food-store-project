import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
  faUser,
  faBars,
  faTags,
  faAddressCard,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';

import styles from './Header.module.scss';
import { Logo } from '../../assets/images';
import Avatar from '../Avatar';
import SideMenu from '../SideMenu';
import Cart from '../Cart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logOut } from '../../features/user/services';
import { setShowCart } from '../../features/cart/cartSlice';
import { setShowWishList } from '../../features/wishlist/wishlistSlice';

const cx = classNames.bind(styles);
function Header() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const { total_items } = useAppSelector((state) => state.cart);
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className={cx('container', pathname === '/' && 'red-bg')}>
      <div className={cx('inner')}>
        <nav className={cx('nav')}>
          <Link className={cx('logo')} to="/">
            <img className={cx('logo-image')} src={Logo} alt="logo" />
          </Link>
          <ul className={cx('nav-bar')}>
            <li className={cx('nav-item')}>
              <Link
                to="/"
                className={cx('nav-link', pathname === '/' && 'active')}
              >
                Home
              </Link>
            </li>
            <li className={cx('nav-item')}>
              <Link
                to="/products"
                className={cx('nav-link', pathname === '/products' && 'active')}
              >
                Oder Online
              </Link>
            </li>
            <li className={cx('nav-item')}>
              <Link
                to="/news"
                className={cx('nav-link', pathname === '/news' && 'active')}
              >
                News
              </Link>
            </li>
            <li className={cx('nav-item')}>
              <Link
                to="/contact"
                className={cx('nav-link', pathname === '/contact' && 'active')}
              >
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
            <img className={cx('logo-image')} src={Logo} alt="logo" />
          </Link>
        </div>
        <div className={cx('user-infor')}>
          <button
            className={cx('cart-btn')}
            onClick={() => dispatch(setShowCart(true))}
          >
            <FontAwesomeIcon
              icon={faBasketShopping}
              className={cx('cart-icon')}
            />
            {!!userInfo.uid && (
              <span className={cx('cart-quantity')}>{total_items}</span>
            )}
          </button>
          {!!userInfo.uid ? (
            <>
              <DropdownButton
                className={cx('drop-down')}
                title={
                  <div className={cx('user')}>
                    <Avatar
                      size={40}
                      url={userInfo.photoURL}
                      displayName={userInfo.displayName}
                    />
                    <p className={cx('user-name')}>{userInfo.displayName}</p>
                  </div>
                }
              >
                <Dropdown.Item>
                  <Link to="/profile" className={cx('menu-item')}>
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className={cx('menu-item-icon')}
                    />
                    My profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className={cx('menu-item')}
                    onClick={() => dispatch(setShowWishList(true))}
                  >
                    <FontAwesomeIcon
                      icon={faTags}
                      className={cx('menu-item-icon')}
                    />
                    My wish list
                  </button>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <button
                    className={cx('menu-item', 'logout-btn')}
                    onClick={() => dispatch(logOut())}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className={cx('menu-item-icon')}
                    />
                    Log out
                  </button>
                </Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            <Link className={cx('signin-btn')} to="/login">
              <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
              Log In
            </Link>
          )}
        </div>
      </div>
      <SideMenu show={showMenu} setShow={setShowMenu} />
      <Cart />
    </header>
  );
}

export default Header;
