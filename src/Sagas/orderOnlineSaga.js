import services from '../Redux/Service/orderOnlineService';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as actions from '../Redux/Action/orderOnlineAction';

export function* getListStore(params) {
  try {
    let data = yield call(services.getListStore, params.payload);
    yield put(actions.getListStoreSuccess(data.data));
  } catch (error) {
    yield put(actions.getListStoreFaild(error.message));
  }
}

export function* watchOrderOnline() {
  yield takeLatest(actions.ACTION_GET_LIST_STORE, getListStore);
}
