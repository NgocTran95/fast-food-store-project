import Banner from './Banner';
import Header from '../../components/Header';
import OderFlow from './OderFlow';
import BestChoices from './BestChoices';
import EventBanner from './EventBanner';
import OfferMenu from './OfferMenu';

function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <OfferMenu />
      <OderFlow/>
      <EventBanner/>
      <BestChoices />
    </div>
  );
}

export default HomePage;
