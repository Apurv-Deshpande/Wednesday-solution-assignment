/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
	let submitSpy;

	beforeEach(() => {
		submitSpy = jest.fn();
	});
	it('should render and match the snapshot', () => {
		const { baseElement } = renderProvider(<HomeContainer dispatchTunesGallery={submitSpy} />);
		expect(baseElement).toMatchSnapshot();
	});

	it('should call dispatchClearTunesGallery on empty change', async () => {
		const getTunesGallerySpy = jest.fn();
		const clearTunesGallerySpy = jest.fn();
		const { getByTestId } = renderProvider(
			<HomeContainer dispatchClearTunesGallery={clearTunesGallerySpy} dispatchTunesGallery={getTunesGallerySpy} />
		);
		fireEvent.change(getByTestId('search-bar'), {
			target: { value: 'a' }
		});
		await timeout(500);
		expect(getTunesGallerySpy).toBeCalled();
		fireEvent.change(getByTestId('search-bar'), {
			target: { value: '' }
		});
		await timeout(500);
		expect(clearTunesGallerySpy).toBeCalled();
	});

	it('should call dispatchTunesGallery on change', async () => {
		const { getByTestId } = renderProvider(<HomeContainer dispatchTunesGallery={submitSpy} />);
		fireEvent.change(getByTestId('search-bar'), {
			target: { value: 'some repo' }
		});
		await timeout(500);
		expect(submitSpy).toBeCalled();
	});
});
