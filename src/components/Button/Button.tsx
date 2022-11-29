import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

interface Props {
  onClick?: () => void;
  to?: string;
  href?: string;
  children: JSX.Element | string;
}

const cx = classNames.bind(styles);
function Button({ onClick, to, href, children }: Props) {
  if (to)
    return (
      <Link to={to} className={cx('btn', 'btn-primary')}>
        {children}
      </Link>
    );
  else if (href)
    return (
      <a href={href} className={cx('btn', 'btn-primary')}>
        {children}
      </a>
    );
  else {
    return (
      <button className={cx('btn', 'btn-primary')} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
