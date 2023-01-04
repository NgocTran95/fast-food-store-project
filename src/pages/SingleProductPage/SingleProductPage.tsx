import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';

function SingleProductPage() {
  return (
    <div>
      <Header />
      <ProductInfo />
      <hr/>
      <Reviews />
      <hr/>
      <RelatedProducts />
      <Footer />
    </div>
  );
}

export default SingleProductPage;
