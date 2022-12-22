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
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import styles from './LoginForm.module.scss';
import { googleIcon, facebookIcon } from '../../../assets/images/social-icon';
import { validateLoginSchema } from '../../../validateForm/validateSchema';
import { logInByEmail, logInWithPopup } from '../../../features/user/services';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

interface Props {
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const cx = classNames.bind(styles);
function LoginForm({ setIsLogIn }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validateLoginSchema),
  });
  const toggleShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  const handleLoginByEmail = (data: LoginFormInputs) => {
    dispatch(logInByEmail(data));
  };
  return (
    <>
      <header className={cx('header')}>Log In</header>
      <form className={cx('form')} onSubmit={handleSubmit(handleLoginByEmail)}>
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
          <p className={cx('error-msg')}>
            {errors.email?.message}
            {error.code === 'auth/user-not-found' &&
              'User not found, please try again!'}
          </p>
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
            <span
              onClick={toggleShowPassword}
              className={cx('toggle-show-btn')}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          <p className={cx('error-msg')}>
            {errors.password?.message}
            {error.code === 'auth/wrong-password' &&
              'Wrong password, please enter correctly'}
          </p>
        </div>
        <p className={cx('notification')}>
          Don't have an account ?
          <strong onClick={() => setIsLogIn(false)}>Create a new one</strong>
        </p>
        <button
          className={cx('login-form-btn')}
          type="submit"
          onClick={handleSubmit(handleLoginByEmail)}
        >
          Log In
        </button>
      </form>
      <div className={cx('separate')}>
        <span>Or</span>
      </div>
      <div className={cx('social-login-btns')}>
        <button
          className={cx('social-login-btn', 'facebook')}
          onClick={() => dispatch(logInWithPopup(facebookProvider))}
        >
          <div className={cx('social-icon')}>
            <img src={facebookIcon} alt="facebook" />
          </div>
          Log in with facebook
        </button>
        <button
          className={cx('social-login-btn', 'google')}
          onClick={() => dispatch(logInWithPopup(googleProvider))}
        >
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
