import Banner from './Banner';
import Header from '../../components/Header';
import FavoriteMenu from './FavoriteMenu';
import EventBanner from './EventBanner';
import OfferMenu from './OfferMenu';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { resetSuccessStatus } from '../../features/user/userSlice';
import SubBanner from './SubBanner/SubBanner';

const customId = 'sign-up-success'

function HomePage() {
  const { isSuccess } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(isSuccess) {
      toast.success('Sign up successfully!', {
        toastId: customId
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
      <EventBanner/>
      <ToastContainer />
    </div>
  );
}

export default HomePage;
