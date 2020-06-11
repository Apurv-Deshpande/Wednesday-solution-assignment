import { homeContainerReducer, initialState, homeContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
	let state;
	beforeEach(() => {
		state = initialState;
	});

	it('should return the initial state', () => {
		expect(homeContainerReducer(undefined, {})).toEqual(state);
	});

	it('should return the initial state when an action of type FETCH_ARTIST is dispatched', () => {
		const artistName = 'Enrique Iglesias';
		const expectedResult = state.set('artistName', artistName);
		expect(
			homeContainerReducer(state, {
				type: homeContainerTypes.REQUEST_GET_TUNES,
				artistName
			})
		).toEqual(expectedResult);
	});

	it('should ensure that the artist data is present and userLoading = false when FETCH_ARTISR_SUCCESS is dispatched', () => {
		const data = { artistName: 'Enrique Iglesias' };
		const expectedResult = state.set('artistsData', data);
		expect(
			homeContainerReducer(state, {
				type: homeContainerTypes.SUCCESS_GET_TUNES,
				data
			})
		).toEqual(expectedResult);
	});

	it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_ARTIST_FAILURE is dispatched', () => {
		const error = 'something_went_wrong';
		const expectedResult = state.set('tunesError', error);
		expect(
			homeContainerReducer(state, {
				type: homeContainerTypes.FAILURE_GET_TUNES,
				error
			})
		).toEqual(expectedResult);
	});
});
