import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './AddCartModal.module.scss';
import { Product } from '../../features/products/productSlice';
import { useAppDispatch } from '../../app/hooks';
import { addToCart, setShowCartModal } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
interface Props {
  show: boolean;
  onHide: () => void;
  product: Product;
}

function AddCartModal({ show, onHide, product }: Props) {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState<number>(1);

  const handleChangeQuantity = (action: 'increase' | 'decrease') => {
    if (action === 'decrease') {
      if (quantity === 1) {
        setQuantity(1);
      } else {
        setQuantity((prev) => prev - 1);
      }
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product_info: product, quantity}))
    dispatch(setShowCartModal(false))
    setQuantity(1)
    toast.success(
      ({ closeToast }) => (
        <p>
          Add <span className={cx('toast-product-name')}>{product.name}</span>{' '}
          to <span className={cx('toast-list-name')}>Cart</span>{' '}
          successfully!
        </p>
      ),
      {
        toastId: `cart-${product.id}`,
        icon: false,
      },
    );
  }
  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={() => {
        onHide();
        setQuantity(1)
      }}
    >
      <Modal.Header closeButton className="p-4">
        <Modal.Title>
          <h1 className={cx('heading')}>Add to cart</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className={cx('product')}>
          <div className={cx('product-info')}>
            <div className={cx('product-image')}>
              <img src={product.img} alt={product.name} />
            </div>
            <div className={cx('product-detail')}>
              <h4 className={cx('product-name')}>{product.name}</h4>
              <p className={cx('product-price')}>${product.price}</p>
            </div>
          </div>
          <div className={cx('quantity')}>
            <button
              className={cx('quantity-btn', 'decrease')}
              onClick={() => handleChangeQuantity('decrease')}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="text"
              value={quantity}
              className={cx('quantity-input')}
              onChange={(e) => setQuantity(+e.target.value)}
            />
            <button
              className={cx('quantity-btn', 'increase')}
              onClick={() => handleChangeQuantity('increase')}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className={cx('sub-total')}>
          Subtotal:{' '}
          <span className={cx('total-value')}>${quantity * product.price}</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="px-4">
        <button className={cx('add-cart-btn')} onClick={handleAddToCart}>Add</button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCartModal;
