import { Row } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import GridProductCardSkeleton from '../../../components/GridProductCardSkeleton';
import GridProductCard from '../../../components/GridProductCard';
import { PRODUCTS_PER_PAGE } from './ProductList';
import { setPage } from '../../../features/filters/filtersSlice';
import { useEffect } from 'react';

interface Props {
  category: string;
}
function GridProductView({ category }: Props) {
  
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.products);
  const { filtered_products, page } = useAppSelector((state) => state.filters);
  const paginated_products = filtered_products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  useEffect(() => {
    if (paginated_products.length === 0) {
      dispatch(setPage(page - 1));
    }
  }, [dispatch, page, paginated_products.length]);

  if (isLoading)
    return (
      <Row>
        {paginated_products.map((product) => (
          <GridProductCardSkeleton key={product.id} lg={3} />
        ))}
      </Row>
    );
  return (
    <Row>
      {paginated_products.map((product) => (
        <GridProductCard
          product={product}
          category={category}
          lg={3}
          key={product.id}
        />
      ))}
    </Row>
  );
}

export default GridProductView;
