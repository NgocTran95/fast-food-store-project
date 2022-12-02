import Banner from './Banner';
import Header from '../../components/Header';
import OderFlow from './OderFlow';
import FoodTypes from './FoodTypes';
import EventBanner from './EventBanner';

function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <OderFlow/>
      <EventBanner/>
      <FoodTypes />
    </div>
  );
}

export default HomePage;
