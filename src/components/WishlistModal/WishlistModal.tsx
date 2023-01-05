import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import {
  Query,
  DocumentData,
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

import styles from './WishlistModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { db } from '../../firebase/config';
import {
  setWishList,
  WishListData,
} from '../../features/wishlist/wishlistSlice';
import WishlistItem from '../WishlistItem';
const cx = classNames.bind(styles);
interface Props {
  show: boolean;
  onHide: () => void;
}

function WishlistModal({ show, onHide }: Props) {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const { id, wishlist: currentWishlist } = useAppSelector(
    (state) => state.wishlist,
  );

  // Update cart to firebase
  useEffect(() => {
    if (!!id) {
      updateDoc(doc(db, 'wishlists', id), { wishlist: [...currentWishlist] });
    }
  }, [currentWishlist, id]);
  // Reset wishlist state when user logout
  useEffect(() => {
    if (!userInfo.uid) {
      dispatch(
        setWishList({
          id: '',
          uid: '',
          wishlist: [],
        }),
      );
    }
  }, [dispatch, userInfo.uid]);
  // Update wishlist state
  useEffect(() => {
    if (!userInfo.uid) return;
    const collectionRef: Query<DocumentData> = query(
      collection(db, 'wishlists'),
      where('uid', '==', userInfo.uid),
      orderBy('createAt', 'asc'),
    );
    const unscribed = onSnapshot(collectionRef, (snapshot) => {
      const document: WishListData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        uid: doc.data().uid,
        wishlist: doc.data().wishlist,
      }));
      dispatch(setWishList(document[0]));
    });
    return () => {
      unscribed();
    };
  }, [dispatch, userInfo.uid]);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton className="p-4">
        <Modal.Title>
          <h1 className={cx('heading')}>Your Wish List</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className={cx('wishlist')}>
          {currentWishlist.map((product) => (
            <WishlistItem product={product} key={product.id}/>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default WishlistModal;
