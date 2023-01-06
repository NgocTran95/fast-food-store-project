import { toast } from 'react-toastify';

import Header from '../../components/Header';
import Banner from './Banner';
import OfferMenu from './OfferMenu';
import FavoriteMenu from './FavoriteMenu';
import SubBanner from './SubBanner';
import Testimonial from './Testimonial';
import BurgerMenu from './BurgerMenu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { resetSuccessStatus } from '../../features/user/userSlice';
import ShowCountUp from './ShowCountUp';
import Delivery from './Delivery';
import Footer from '../../components/Footer';

function HomePage() {
  const { isSuccess } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(isSuccess) {
      toast.success('Sign up successfully!', {
        toastId: 'sign-up-success'
      })
      dispatch(resetSuccessStatus())
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Header />
      <Banner />
      <OfferMenu />
      <FavoriteMenu />
      <SubBanner />
      <Testimonial />
      <BurgerMenu />
      <ShowCountUp />
      <Delivery />
      <Footer />
    </div>
  );
}

export default HomePage;
