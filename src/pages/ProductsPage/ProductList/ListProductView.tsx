import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ListProductCard from '../../../components/ListProductCard';
import ListProductCardSkeleton from '../../../components/ListProductCardSkeleton';
import { PRODUCTS_PER_PAGE } from './ProductList';
import { setPage } from '../../../features/filters/filtersSlice';
import { useEffect } from 'react';

interface Props {
  category: string;
}
function ListProductView({ category }: Props) {
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

  if (isLoading) {
    return (
      <>
        {paginated_products.map((product) => (
          <ListProductCardSkeleton key={product.id} />
        ))}
      </>
    );
  }
  return (
    <>
      {paginated_products.map((product) => (
        <ListProductCard key={product.id} product={product} category={category}/>
      ))}
    </>
  );
}

export default ListProductView;
