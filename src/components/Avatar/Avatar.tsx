import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
interface PropsType {
  size: number;
  url?: string;
  displayName: string;
}
const cx = classNames.bind(styles);
function Avatar({ size, url, displayName }: PropsType) {
  return (
    <div className={cx('container')} style={{ width: size, height: size }}>
      {url ? <img src={url} alt='avatar'/> : displayName.charAt(0).toUpperCase()}
    </div>
  );
}

export default Avatar;
