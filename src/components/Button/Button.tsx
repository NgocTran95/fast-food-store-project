import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

interface Props {
  onClick?: () => void;
  to?: string;
  href?: string;
  className?: string;
  children: JSX.Element | string;
  variants: 'outline' | 'primary';
  type?: 'submit';
}

const cx = classNames.bind(styles);
function Button({ onClick, to, href, children, className, variants, type }: Props) {
  if (to)
    return (
      <Link to={to} className={cx('btn', `btn-${variants}` , className)}>
        {children}
      </Link>
    );
  else if (href)
    return (
      <a href={href} className={cx('btn', `btn-${variants}` , className)}>
        {children}
      </a>
    );
  else {
    return (
      <button className={cx('btn', `btn-${variants}` , className)} onClick={onClick} type={type}>
        {children}
      </button>
    );
  }
}

export default Button;
