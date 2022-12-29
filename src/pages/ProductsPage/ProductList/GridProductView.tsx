import { Row } from 'react-bootstrap';

import { useAppSelector } from '../../../app/hooks';
import GridProductCardSkeleton from '../../../components/GridProductCardSkeleton';
import GridProductCard from '../../../components/GridProductCard';

function GridProductView() {
  const { isLoading, productList } = useAppSelector((state) => state.products);
  if (isLoading)
    return (
      <Row>
        {Array.from(Array(12).keys()).map((item) => (
          <GridProductCardSkeleton key={item} lg={3} />
        ))}
      </Row>
    );
  return (
    <Row>
      {productList.map((product) => (
        <GridProductCard
          product={product}
          lg={3}
          isActive={true}
          key={product.id}
        />
      ))}
    </Row>
  );
}

export default GridProductView;
