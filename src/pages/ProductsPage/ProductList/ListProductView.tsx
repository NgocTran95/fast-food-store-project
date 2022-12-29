import { Row, Col } from 'react-bootstrap';

import { useAppSelector } from '../../../app/hooks';
import ListProductCard from '../../../components/ListProductCard';
import ListProductCardSkeleton from '../../../components/ListProductCardSkeleton';

function ListProductView() {
  const { isLoading, productList } = useAppSelector((state) => state.products);
  if (isLoading) {
    return (
      <>
        {productList.map((product) => (
          <ListProductCardSkeleton key={product.id} />
        ))}
      </>
    );
  }
  return (
    <>
      {productList.map((product) => (
        <ListProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default ListProductView;
