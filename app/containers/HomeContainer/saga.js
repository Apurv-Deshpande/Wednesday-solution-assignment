import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_TUNES } = homeContainerTypes;
const { successGetTunes, failureGetTunes } = homeContainerCreators;
export function* getTunes(action) {
	const response = yield call(getSongs, action.artistName);
	const { data, ok } = response;
	if (ok) {
		yield put(successGetTunes(data));
	} else {
		yield put(failureGetTunes(data));
	}
}
// Individual exports for testing
export default function* homeContainerSaga() {
	yield takeLatest(REQUEST_GET_TUNES, getTunes);
}
