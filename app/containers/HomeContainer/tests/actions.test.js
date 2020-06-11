import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
	it('has a type of REQUEST_GET_TUNES', () => {
		const expected = {
			type: homeContainerTypes.REQUEST_GET_TUNES,
			artistName: 'artistName'
		};
		expect(homeContainerCreators.requestGetTunes('artistName')).toEqual(expected);
	});
});
