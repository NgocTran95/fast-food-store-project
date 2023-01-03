import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ProductInfo from './ProductInfo';
import Reviews from './Reviews';

function SingleProductPage() {
  return (
    <div>
      <Header />
      <ProductInfo />
      <hr/>
      <Reviews />
      <Footer />
    </div>
  );
}

export default SingleProductPage;
