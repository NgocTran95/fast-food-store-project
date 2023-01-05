import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { Container, Row } from 'react-bootstrap';

import { useAppSelector } from '../../../app/hooks';
import GridProductCard from '../../../components/GridProductCard';
import { paginateList } from '../../../utils';
import OfferMenuSliderArrow from '../../HomePage/OfferMenu/OfferMenuSliderArrow';

import styles from './RelatedProducts.module.scss';

const settings = {
  infinite: true,
  speed: 800,
  prevArrow: <OfferMenuSliderArrow to="prev" />,
  nextArrow: <OfferMenuSliderArrow to="next" />,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const cx = classNames.bind(styles);
function RelatedProducts() {
  const { related_products } = useAppSelector((state) => state.single_product);
  const { pathname } = useLocation();
  const category = pathname.split('/')[2];
  const paginated_related_products = paginateList(related_products, 4);
  return (
    <section className={cx('container')}>
      <h1 className={cx('heading')}>Related Products</h1>
      <Slider {...settings}>
        {paginated_related_products.map((products, index) => (
          <Container className={cx('menu')} key={index}>
            <Row>
              {products.map((product) => (
                <GridProductCard
                  key={product.id}
                  product={product}
                  category={category}
                  lg={3}
                  sm={6}
                />
              ))}
            </Row>
          </Container>
        ))}
      </Slider>
    </section>
  );
}

export default RelatedProducts;
