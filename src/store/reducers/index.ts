/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-08 16:27:48
 * @LastEditTime: 2020-06-08 16:32:41
 * @FilePath: /koala_background_system/src/store/actions/reducers/index.ts
 */

import { combineReducers } from 'redux';
import * as user from './user';

export default combineReducers({ ...user });
