import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faXmark,
  faHome,
  faBurger,
  faSquarePhone,
  faFire,
  faTags,
  faAddressCard,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';

import styles from './SideMenu.module.scss';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logOut } from '../../features/user/services';
import { setShowWishList } from '../../features/wishlist/wishlistSlice';

const cx = classNames.bind(styles);

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideMenu({ show, setShow }: Props) {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const handleClose = () => {
    setShow(false);
  };
  const handleLogOut = () => {
    dispatch(logOut());
    setShow(false);
  };
  return (
    <Offcanvas show={show} onHide={handleClose} className={cx('container')}>
      <Offcanvas.Header>
        {!!userInfo.uid ? (
          <div className={cx('user')}>
            <Avatar
              size={40}
              url={userInfo.photoURL}
              displayName={userInfo.displayName}
            />
            <p className={cx('user-name')}>{userInfo.displayName}</p>
          </div>
        ) : (
          <p className={cx('notification')}>You are not logged in</p>
        )}
        <button className={cx('close-btn')} onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Link to="/" className={cx('nav-link')}>
          <FontAwesomeIcon icon={faHome} className={cx('nav-icon')} />
          Home
        </Link>
        <Link to="/products" className={cx('nav-link')}>
          <FontAwesomeIcon icon={faBurger} className={cx('nav-icon')} />
          Oder online
        </Link>
        <Link to="/news" className={cx('nav-link')}>
          <FontAwesomeIcon icon={faFire} className={cx('nav-icon')} />
          News
        </Link>
        <Link to="/contact" className={cx('nav-link')}>
          <FontAwesomeIcon icon={faSquarePhone} className={cx('nav-icon')} />
          Contact
        </Link>
        <Link to="/profile" className={cx('nav-link')}>
          <FontAwesomeIcon icon={faAddressCard} className={cx('nav-icon')} />
          My profile
        </Link>
        <button className={cx('nav-btn')} onClick={() => dispatch(setShowWishList(true))}>
          <FontAwesomeIcon icon={faTags} className={cx('nav-icon')} />
          My wish list
        </button>
        <hr />
        {!!userInfo.uid ? (
          <button
            className={cx('nav-btn', 'logout-btn')}
            onClick={handleLogOut}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={cx('nav-icon')}
            />
            Log out
          </button>
        ) : (
          <Link to="/login" className={cx('nav-btn', 'logout-btn')}>
            <FontAwesomeIcon icon={faUser} className={cx('nav-icon')} />
            Log in
          </Link>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideMenu;
