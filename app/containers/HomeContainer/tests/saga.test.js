/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getTunes } from '../saga';
import { homeContainerTypes } from '../reducer';
import get from 'lodash/get';

describe('HomeContainer saga tests', () => {
	const generator = homeContainerSaga();
	const artistName = 'Shakira';
	let getTunesGenerator = getTunes({ artistName });

	it('should start task to watch for REQUEST_GET_TUNES REPOS action', () => {
		expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_TUNES, getTunes));
	});

	it('should ensure that the action FAILURE_GET_TUNES is dispatched when the api call fails', () => {
		const res = getTunesGenerator.next().value;
		expect(res).toEqual(call(getSongs, artistName));
		const errorResponse = {
			errorMessage: 'There was an error while fetching repo informations.'
		};
		expect(getTunesGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
			put({
				type: homeContainerTypes.FAILURE_GET_TUNES,
				error: errorResponse
			})
		);
	});

	it('should ensure that the action SUCCESS_GET_TUNES is dispatched when the api call succeeds', () => {
		getTunesGenerator = getTunes({ artistName });
		const res = getTunesGenerator.next().value;
		expect(res).toEqual(call(getSongs, artistName));
		const tunesResponse = {
			resultCount: 50,
			items: [ { artistName: artistName } ]
		};
		expect(getTunesGenerator.next(apiResponseGenerator(true, tunesResponse)).value).toEqual(
			put({
				type: homeContainerTypes.SUCCESS_GET_TUNES,
				data: tunesResponse
			})
		);
	});
});
