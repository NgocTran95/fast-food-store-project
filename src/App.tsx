import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import ErrorPage from './pages/ErrorPage';
import CheckoutPage from './pages/CheckoutPage';
import { MENU_LIST } from './pages/HomePage/OfferMenu/OfferMenu';

function App() {
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
          <>
            <Route
              path={item.to}
              key={item.name}
              element={<ProductsPage currentFoodType={item.to.split('/')[2]} />}
            >
            </Route>
            <Route path={`${item.to}/:id`} key={`${item.name}/:id`} element={<SingleProductPage />} />
          </>
        ))}
        <Route path='products/best-foods/:id' element={<SingleProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
