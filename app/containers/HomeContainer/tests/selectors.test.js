import { fromJS } from 'immutable';
import { selectHomeContainer, selectArtistName, selectArtistsData, selectArtistsError } from '../selectors';

describe('HomeContainer selector tests', () => {
	let mockedState;
	let artistName;
	let artistsData;
	let artistsError;

	beforeEach(() => {
		artistName = 'Shakira';
		artistsData = { resultCount: 50, items: [ { artistName } ] };
		artistsError = 'There was some error while fetching the tunes details';

		mockedState = {
			homeContainer: fromJS({
				artistName,
				artistsData,
				artistsError
			})
		};
	});
	it('should select the homeContainer state', () => {
		const homeContainerSelector = selectHomeContainer();
		expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer.toJS());
	});
	it('should select the artistName', () => {
		const artistSelector = selectArtistName();
		expect(artistSelector(mockedState)).toEqual(artistName);
	});

	it('should select artistsData', () => {
		const artistsDataSelector = selectArtistsData();
		expect(artistsDataSelector(mockedState)).toEqual(artistsData);
	});

	it('should select the artistsError', () => {
		const artistsErrorSelector = selectArtistsError();
		expect(artistsErrorSelector(mockedState)).toEqual(artistsError);
	});
});
