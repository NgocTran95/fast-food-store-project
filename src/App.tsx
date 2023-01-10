import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import ErrorPage from './pages/ErrorPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AddCartModal from './components/AddCartModal';
import ScrollToTop from './components/ScrollToTop';
import CornerTools from './components/CornerTools';
import WishlistModal from './components/WishlistModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setShowCartModal } from './features/cart/cartSlice';
import { setShowWishList } from './features/wishlist/wishlistSlice';
import { MENU_LIST } from './pages/HomePage/OfferMenu/OfferMenu';

function App() {
  const dispatch = useAppDispatch();
  const { isOpenCartModal, add_cart_product } = useAppSelector(
    (state) => state.cart,
  );
  const { isOpenWishListModal } = useAppSelector((state) => state.wishlist);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={<ProductsPage currentFoodType="best-foods" />}
        />
        {MENU_LIST.map((item) => (
          <Route key={item.name}>
            <Route
              path={item.to}
              element={<ProductsPage currentFoodType={item.to.split('/')[2]} />}
            ></Route>
            <Route path={`${item.to}/:id`} element={<SingleProductPage />} />
          </Route>
        ))}
        <Route path="products/best-foods/:id" element={<SingleProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <CornerTools />
      <AddCartModal
        show={isOpenCartModal}
        product={add_cart_product}
        onHide={() => dispatch(setShowCartModal(false))}
      />
      <WishlistModal
        show={isOpenWishListModal}
        onHide={() => dispatch(setShowWishList(false))}
      />
      <ToastContainer />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
