import { create } from 'apisauce';

const api = create({
	baseURL: 'https://itunes.apple.com/',
	headers: { 'Content-Type': 'application/json' }
});

export const getSongs = (artistName) => api.get(`search?term=${artistName}`);
