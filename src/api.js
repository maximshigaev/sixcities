import axios from 'axios';

const api = axios.create({
	baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
});

const getOffers = () => api.get(`/hotels`);

const sendUserData = (userData) => api.post(`/login`, userData);

const requestAuth = () => api.get(`/login`);

const getReviews = (id) => api.get(`/comments/${id}`);

const sendUserReview = (review, id) => api.post(`/comments/${id}`, review);

const getFavorites = () => api.get(`/favorite`);

const setFavorite = (id, isFavorite) => api.post(`/favorite/${id}/${(isFavorite) ? 0 : 1}`);

const getNearbyHotels = (id) => api.get(`/hotels/${id}/nearby`);

export {getOffers, sendUserData, getReviews, sendUserReview, getFavorites, setFavorite, requestAuth, getNearbyHotels};
