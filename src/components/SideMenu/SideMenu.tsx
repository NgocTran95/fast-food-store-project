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
  faAddressCard
} from '@fortawesome/free-solid-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';

import styles from './SideMenu.module.scss';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideMenu({ show, setShow }: Props) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Offcanvas show={show} onHide={handleClose} className={cx('container')}>
      <Offcanvas.Header>
        <div className={cx('user')}>
          <Avatar size={40} url="" displayName="Tran Ngoc" />
          <p className={cx('user-name')}>Trần Ngọc</p>
        </div>
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
        <button className={cx('nav-btn')}>
          <FontAwesomeIcon icon={faTags} className={cx('nav-icon')} />
          My wish list
        </button>
        <hr />
        <button className={cx('nav-btn', 'logout-btn')}>
          <FontAwesomeIcon icon={faRightFromBracket} className={cx('nav-icon')} />
          Log out
        </button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideMenu;
