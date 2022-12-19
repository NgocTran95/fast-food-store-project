import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './SignUpForm.module.scss';
import { validateSignUpSchema } from './../../../validateForm/validateSchema';
import { useAppDispatch } from '../../../app/hooks';
import { registerUser } from '../../../features/user/userAction';

interface Props {
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignUpFormInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const cx = classNames.bind(styles);
function SignUpForm({ setIsLogIn }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(validateSignUpSchema),
  });
  const toggleShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  const handleSignUp = async(data: SignUpFormInputs) => {
    const { email, username, password } = data
    dispatch(registerUser({email, username, password}))
  };
  return (
    <>
      <header className={cx('header')}>Sign Up</header>
      <form className={cx('form')} onSubmit={handleSubmit(handleSignUp)}>
        <div className={cx('form-control')}>
          <label htmlFor="signup-email">Email</label>
          <div className={cx('form-input')}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              id="signup-email"
              placeholder="Enter your email..."
              {...register('email')}
            />
          </div>
          <p className={cx('error-msg')}>{errors.email?.message}</p>
        </div>
        <div className={cx('form-control')}>
          <label htmlFor="signup-username">Username</label>
          <div className={cx('form-input')}>
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              id="signup-username"
              placeholder="Enter your username..."
              {...register('username')}
            />
          </div>
          <p className={cx('error-msg')}>{errors.username?.message}</p>
        </div>
        <div className={cx('form-control')}>
          <label htmlFor="signup-password">Password</label>
          <div className={cx('form-input')}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
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
        <div className={cx('form-control')}>
          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <div className={cx('form-input')}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="signup-confirm-password"
              placeholder="Confirm your password..."
              {...register('confirmPassword')}
            />
            <button
              onClick={toggleShowPassword}
              className={cx('toggle-show-btn')}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <p className={cx('error-msg')}>{errors.confirmPassword?.message}</p>
        </div>
        <p className={cx('notification')}>
          Already had an account ?
          <strong onClick={() => setIsLogIn(true)}>Login now</strong>
        </p>
        <button
          className={cx('signup-form-btn')}
          type="submit"
          onClick={handleSubmit(handleSignUp)}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
