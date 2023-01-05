import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import ErrorPage from './pages/ErrorPage';
import CheckoutPage from './pages/CheckoutPage';
import { MENU_LIST } from './pages/HomePage/OfferMenu/OfferMenu';
import AddCartModal from './components/AddCartModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setShowCartModal } from './features/cart/cartSlice';

function App() {
  const dispatch = useAppDispatch()
  const { isOpenCartModal, add_cart_product } = useAppSelector(state => state.cart)
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
            >
            </Route>
            <Route path={`${item.to}/:id`} element={<SingleProductPage />} />
          </Route>
        ))}
        <Route path='products/best-foods/:id' element={<SingleProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <AddCartModal show={isOpenCartModal} product={add_cart_product} onHide={() => dispatch(setShowCartModal('close'))}/>
    </BrowserRouter>
  );
}

export default App;
