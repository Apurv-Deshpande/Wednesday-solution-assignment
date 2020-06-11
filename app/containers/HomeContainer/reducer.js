/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
	requestGetTunes: [ 'artistName' ],
	successGetTunes: [ 'data' ],
	failureGetTunes: [ 'error' ],
	clearTunes: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
	produce(
		state,
		(/* draft */) => {
			switch (action.type) {
				case homeContainerTypes.REQUEST_GET_TUNES:
					return initialState.set('artistName', action.artistName);
				case homeContainerTypes.CLEAR_TUNES:
					return initialState.set('artistName', null).set('artistsData', null);
				case homeContainerTypes.SUCCESS_GET_TUNES:
					return state.set('artistsData', action.data);
				case homeContainerTypes.FAILURE_GET_TUNES:
					return state.set('tunesError', _.get(action.error, 'message', 'something_went_wrong'));
			}
			return state;
		}
	);

export default homeContainerReducer;
