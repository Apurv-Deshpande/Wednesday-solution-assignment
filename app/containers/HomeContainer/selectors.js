import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = (state) => (state.homeContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () => createSelector(selectHomeContainerDomain, (substate) => substate);

export const selectArtistsData = () =>
	createSelector(selectHomeContainerDomain, (substate) => _.get(substate, 'artistsData', null));

export const selectArtistsError = () =>
	createSelector(selectHomeContainerDomain, (substate) => _.get(substate, 'artistsError', null));

export const selectArtistName = () =>
	createSelector(selectHomeContainerDomain, (substate) => _.get(substate, 'artistName', null));

export default selectHomeContainer;
