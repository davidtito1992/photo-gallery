import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import { reactotronRedux } from 'reactotron-redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import photos from './photos/reducer';
import user from './user/reducer';

const iReactotron = Reactotron.configure({ name: 'photoGallery' })
  .use(reactotronRedux())
  .connect();

const reducers = combineReducers({
  photos,
  user,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['home', 'mainList'],
};

const pReducer = persistReducer(persistConfig, reducers);

const middlewares = [];
const enhancers = [];

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

if (__DEV__ && iReactotron.createEnhancer) {
  enhancers.push(iReactotron.createEnhancer());
}

// In DEV mode, we'll create the store through Reactotron if(features.reduxpersist) { _%>persistedReducer<%_ }
const store = createStore(pReducer, compose(...enhancers));
const persistor = persistStore(store);

if (__DEV__ && iReactotron.setReduxStore) {
  iReactotron.setReduxStore(store);
}

export { store, persistor };
