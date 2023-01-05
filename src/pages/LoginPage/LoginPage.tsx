import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import styles from './LoginPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { setUser } from '../../features/user/userSlice';
import Loading from '../../components/Loading';

const cx = classNames.bind(styles);
function LoginPage() {
  const [isLogIn, setIsLogIn] = useState(true);
  const { isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getUser = async (uid: string) => {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  };
  useEffect(() => {
    const unscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid).then((user) => {
          const { email, displayName, photoURL, uid } = user[0];
          dispatch(setUser({ email, displayName, photoURL, uid }));
          localStorage.setItem(
            'user',
            JSON.stringify({ email, displayName, photoURL, uid }),
          );
        });
        navigate('/');
      }
    });
    return () => {
      unscribed();
    };
  }, [dispatch, navigate]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className={cx('container')}>
      <div className={cx('inner')}>
        <div className={cx('hero')}></div>
        <div className={cx('content')}>
          {isLogIn ? (
            <LoginForm setIsLogIn={setIsLogIn} />
          ) : (
            <SignUpForm setIsLogIn={setIsLogIn} />
          )}
          <Link to="/" className={cx('back-home-btn')}>Back to Home page</Link>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
