import classNames from 'classnames/bind';
import { useState } from 'react';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);
function LoginPage() {
    const [isLogIn, setIsLogIn] = useState(true)
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('hero')}></div>
        <div className={cx('content')}>
          {isLogIn ? <LoginForm setIsLogIn={setIsLogIn}/> : <SignUpForm setIsLogIn={setIsLogIn}/>}
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
