import services from '../Redux/Service/homeService';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as actions from '../Redux/Action/homeAction';

export function* getListCategory(params) {
  try {
    let data = yield call(services.getListCategory, params.payload);
    yield put(actions.getCategorySuccess(data.data));
  } catch (error) {
    yield put(actions.getCategoryFaild(error.message));
  }
}

export function* getStoreDetail(params) {
  console.log('thai saga');
  try {
    let data = yield call(
      services.getStoreDetailWithBookTableInStore,
      params.payload,
    );
    yield put(actions.getStoreDetailWithBookTableInStoreSuccess(data.data));
  } catch (error) {
    yield put(actions.getStoreDetailWithBookTableInStoreFaild(error.message));
  }
}

export function* watchHome() {
  yield takeLatest(actions.ACTION_GET_CATEGORY, getListCategory);
  yield takeLatest(
    actions.ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE,
    getStoreDetail,
  );
}
