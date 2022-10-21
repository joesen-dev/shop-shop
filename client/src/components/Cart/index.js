import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const Cart = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      // dispatch the ADD_MULTIPLE_TO_CART action here because we have an array of items returning from IndexedDB, even if it's just one product saved.
      // This way we can just dump all of the products into the global state object at once instead of doing it one by one
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
    /**
     * pass the state.cart.length value into useEffect()'s dependency array.
     * this prevents the useEffect() from contiuously looping
     * Through the dependency array, list all of the data that this useEffect() Hook is dependent on to execute
     * The Hook runs on load no matter what, but then it only runs again if any value in the dependency array has changed since the last time it ran.
     */
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  if (!state.cartOpen) {
    return (
      <div className='cart-closed' onClick={toggleCart}>
        <span role='img' aria-label='trash'>
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className='close' onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {/* tems on state.cart are mapped into a series of <CartItem /> components */}
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className='flex-row space-between'>
            {/* display the total amount. */}
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        // wrapped the main shopping cart content in a ternary expression
        // to display a different message if state.cart.length is zero
        <h3>
          <span role='img' aria-label='shocked'>
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
