import Banner from './Banner';
import Header from '../../components/Header';
import OderFlow from './OderFlow';
import FavouriteMenu from './FavouriteMenu';
import EventBanner from './EventBanner';
import OfferMenu from './OfferMenu';

function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <OfferMenu />
      <FavouriteMenu />
      <OderFlow/>
      <EventBanner/>
    </div>
  );
}

export default HomePage;
