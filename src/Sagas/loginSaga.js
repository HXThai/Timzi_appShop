import services from '../Redux/Service/LoginService';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as actions from '../Redux/Action/loginAction';

export function* login(params) {
  try {
    let data = yield call(services.login, params.payload);
    yield put(actions.loginSuccess(data));
  } catch (error) {
    yield put(actions.loginFaild(error.message));
  }
}

export function* userInformation(params) {
  try {
    let data = yield call(services.getUserInformation, params.payload);
    // console.log('data', data);
    yield put(actions.getUserInformationSuccess(data));
  } catch (error) {
    yield put(actions.getUserInformationFaild(error.message));
  }
}

export function* watchLogin() {
  yield takeLatest(actions.ACTION_LOGIN, login);
  yield takeLatest(actions.ACTION_GET_USER_INFORMATION, userInformation);
}
