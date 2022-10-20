// import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';
import { reducer } from '../utils/reducers';

// create a sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: 'Food' }],
  currentCategory: '1',
};

test('UPDATE_PRODUCTS', () => {
  // newState object will be the result of what comes from a function that we haven't created yet, called reducer()
  // This function accepts the following two parameters:
  let newState = reducer(
    initialState, // current state object, so we can make our copy of it for the new state
    {
      type: UPDATE_PRODUCTS, // This is the type of action we're performing, and should be one of the predefined actions we created earlier
      products: [{}, {}], // the value of the new data we want to use with the action
    } // The action we're performing to update state, which is broken into the following two parts as an object
  );

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: '2',
  });

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});
