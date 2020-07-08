import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'fastfeet:app',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line no-console
export const store = createStore(
  persistedReducer,
  console.tron.createEnhancer()
);
export const persistor = persistStore(store);
