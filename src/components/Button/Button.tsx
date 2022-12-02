import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

interface Props {
  onClick?: () => void;
  to?: string;
  href?: string;
  classNames?: string;
  children: JSX.Element | string;
}

const cx = classNames.bind(styles);
function Button({ onClick, to, href, children, classNames }: Props) {
  if (to)
    return (
      <Link to={to} className={cx('btn', 'btn-primary', classNames)}>
        {children}
      </Link>
    );
  else if (href)
    return (
      <a href={href} className={cx('btn', 'btn-primary', classNames)}>
        {children}
      </a>
    );
  else {
    return (
      <button className={cx('btn', 'btn-primary', classNames)} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
