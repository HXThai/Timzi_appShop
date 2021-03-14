import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */
// import {TestTypes} from '../Redux/TestRedux';

/* ------------- Sagas ------------- */
// import {test} from './TestSagas';

/* ------------- Connect Types To Sagas ------------- */

import {watchHome} from './homeSaga';
import {watchLogin} from './loginSaga';
import {watchOrderOnline} from './orderOnlineSaga';

export default function* root() {
  yield all([watchHome(), watchLogin(), watchOrderOnline()]);
}
