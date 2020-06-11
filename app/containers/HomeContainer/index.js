import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer, selectArtistsData, selectArtistsError, selectArtistName } from './selectors';
import { homeContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
	&& {
		display: flex;
		flex-direction: column;
		max-width: ${(props) => props.maxwidth}px;
		width: 100%;
		margin: 0 auto;
		padding: ${(props) => props.padding}px;
	}
`;
const RightContent = styled.div`
	display: flex;
	align-self: flex-end;
`;
export function HomeContainer({
	dispatchTunesGallery,
	dispatchClearTunesGallery,
	intl,
	artistsData = {},
	artistsError = null,
	artistName,
	maxwidth,
	padding
}) {
	useInjectSaga({ key: 'homeContainer', saga });
	const [ loading, setLoading ] = useState(false);

	useEffect(
		() => {
			// Effects will be called instead of componentDidMount, componentDidUpdate, componentWillRecieveProps
			// This effect will be called for every render.
			const loaded = get(artistsData, 'results', null) || artistsError;
			if (loading && loaded) {
				setLoading(false);
			}
		},
		[ artistsData ]
	);

	const history = useHistory();

	const handleOnChange = (rName) => {
		if (!isEmpty(rName)) {
			dispatchTunesGallery(rName);
			setLoading(true);
		} else {
			dispatchClearTunesGallery();
		}
	};
	const debouncedHandleOnChange = debounce(handleOnChange, 200);

	const renderArtistList = () => {
		const results = get(artistsData, 'results', []);
		const resultCount = get(artistsData, 'resultCount', 0);
		return (
			(results.length !== 0 || loading) && (
				<CustomCard>
					<Skeleton loading={loading} active>
						{artistName && (
							<div>
								<T id="search_query" values={{ artistName }} />
							</div>
						)}
						{resultCount !== 0 && (
							<div>
								<T id="matching_tunes" values={{ resultCount }} />
							</div>
						)}
						{results.map((item, index) => (
							<CustomCard key={index}>
								<div>Artist Name: {item.artistName}</div>
								<div>Collecton Name: {item.collectionName}</div>
								<div>
									Collecton Price:
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(item.collectionPrice)}
								</div>

								<div>
									Track Price:
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(item.trackPrice)}
								</div>
							</CustomCard>
						))}
					</Skeleton>
				</CustomCard>
			)
		);
	};
	const renderErrorState = () => {
		let artistError;
		if (artistsError) {
			artistError = artistsError;
		} else if (!get(artistsData, 'resultCount', 0)) {
			artistError = 'tunes_search_default';
		}
		return (
			!loading &&
			artistError && (
				<CustomCard color={artistError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'tune_list' })}>
					<T id={artistError} />
				</CustomCard>
			)
		);
	};
	const refreshPage = () => {
		history.push('stories');
		window.location.reload();
	};
	return (
		<Container maxwidth={maxwidth} padding={padding}>
			<RightContent>
				<Clickable textId="stories" onClick={refreshPage} />
			</RightContent>
			<CustomCard title={intl.formatMessage({ id: 'tune_search' })} maxwidth={maxwidth}>
				<T marginBottom={10} id="get_tunes_details" />
				<Search
					data-testid="search-bar"
					defaultValue={artistName}
					type="text"
					onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
					onSearch={(searchText) => debouncedHandleOnChange(searchText)}
				/>
			</CustomCard>
			{renderArtistList()}
			{renderErrorState()}
		</Container>
	);
}

HomeContainer.propTypes = {
	dispatchTunesGallery: PropTypes.func,
	dispatchClearTunesGallery: PropTypes.func,
	intl: PropTypes.object,
	artistsData: PropTypes.shape({
		resultCount: PropTypes.number,

		results: PropTypes.array
	}),
	artistsError: PropTypes.object,
	artistName: PropTypes.string,
	history: PropTypes.object,
	maxwidth: PropTypes.number,
	padding: PropTypes.number
};

HomeContainer.defaultProps = {
	maxwidth: 500,
	padding: 20
};

const mapStateToProps = createStructuredSelector({
	homeContainer: selectHomeContainer(),
	artistsData: selectArtistsData(),
	artistsError: selectArtistsError(),
	artistName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
	const { requestGetTunes, clearTunes } = homeContainerCreators;
	return {
		dispatchTunesGallery: (artistName) => dispatch(requestGetTunes(artistName)),
		dispatchClearTunesGallery: () => dispatch(clearTunes())
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect, memo)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
