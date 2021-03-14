import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Sagas/index';

import homeReducer from './Reducer/homeReducer';
import loginReducer from './Reducer/loginReducer';
import orderOnlineReducer from './Reducer/orderOnlineReducer';

const rootReducer = combineReducers({
  homeReducer,
  loginReducer,
  orderOnlineReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
