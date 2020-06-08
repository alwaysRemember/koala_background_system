/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-08 16:32:21
 * @LastEditTime: 2020-06-08 16:39:06
 * @FilePath: /koala_background_system/src/store/index.ts
 */

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ['userInfo'],
};

const myReducers = persistReducer<any, any>(persistConfig, reducers);

const store = createStore(myReducers, undefined, composeWithDevTools());

export const persistor = persistStore(store);
export default store;
