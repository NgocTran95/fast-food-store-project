import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './LoginForm.module.scss';
import { googleIcon, facebookIcon } from '../../../assets/images/social-icon';
import { validateLoginSchema } from '../../../validateForm/validateSchema';

interface Props {
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const cx = classNames.bind(styles);
function LoginForm({ setIsLogIn } : Props) {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<LoginFormInputs>({
    resolver: yupResolver(validateLoginSchema)
  })
  const toggleShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  const handleLogin = (data: LoginFormInputs) => {
    console.log(data);
  };
  return (
    <>
      <header className={cx('header')}>Log In</header>
      <form className={cx('form')} onSubmit={handleSubmit(handleLogin)}>
        <div className={cx('form-control')}>
          <label htmlFor="login-email">Email</label>
          <div className={cx('form-input')}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              id="login-email"
              placeholder="Enter your email..."
              {...register('email')}
            />
          </div>
          <p className={cx('error-msg')}>{errors.email?.message}</p>
        </div>
        <div className={cx('form-control')}>
          <label htmlFor="login-password">Password</label>
          <div className={cx('form-input')}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-password"
              placeholder="Enter your password..."
              {...register('password')}
            />
            <button
              onClick={toggleShowPassword}
              className={cx('toggle-show-btn')}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <p className={cx('error-msg')}>{errors.password?.message}</p>
        </div>
        <p className={cx('notification')}>
          Don't have an account ?<strong onClick={() => setIsLogIn(false)}>Create a new one</strong>
        </p>
        <button
          className={cx('login-form-btn')}
          type="submit"
          onClick={handleSubmit(handleLogin)}
        >
          Log In
        </button>
      </form>
      <div className={cx('separate')}>
        <span>Or</span>
      </div>
      <div className={cx('social-login-btns')}>
        <button className={cx('social-login-btn', 'facebook')}>
          <div className={cx('social-icon')}>
            <img src={facebookIcon} alt="facebook" />
          </div>
          Log in with facebook
        </button>
        <button className={cx('social-login-btn', 'google')}>
          <div className={cx('social-icon')}>
            <img src={googleIcon} alt="google" />
          </div>
          Log in with google
        </button>
      </div>
    </>
  );
}

export default LoginForm;
