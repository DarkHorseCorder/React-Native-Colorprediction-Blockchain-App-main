import thunk from 'redux-thunk';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { applyMiddleware } from 'redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;