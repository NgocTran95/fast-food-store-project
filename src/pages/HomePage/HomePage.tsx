import Banner from './Banner';
import Header from '../../components/Header';
import OderFlow from './OderFlow';
import FavouriteMenu from './FavouriteMenu';
import EventBanner from './EventBanner';
import OfferMenu from './OfferMenu';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';

const customId = 'sign-up-success'

function HomePage() {
  const { isSuccess } = useAppSelector(state => state.user)
  useEffect(() => {
    if(isSuccess) {
      toast.success('Sign up successfully!', {
        toastId: customId
      })
    }
  }, [isSuccess])
  return (
    <div>
      <Header />
      <Banner />
      <OfferMenu />
      <FavouriteMenu />
      <OderFlow/>
      <EventBanner/>
      <ToastContainer />
    </div>
  );
}

export default HomePage;
