import axios from 'axios';

class Api {
    _api = axios.create({
        baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
        timeout: 5000,
        withCredentials: true
    });

    getOffers = () => this._api.get(`/hotels`);

    sendUserData = (userData) => this._api.post(`/login`, userData);

    requestAuth = () => this._api.get(`/login`);

    getReviews = (id) => this._api.get(`/comments/${id}`);

    sendUserReview = (review, id) => this._api.post(`/comments/${id}`, review);

    getFavorites = () => this._api.get(`/favorite`);

    setFavorite = (id, isFavorite) => this._api.post(`/favorite/${id}/${(isFavorite) ? 0 : 1}`);

    getNearbyHotels = (id) => this._api.get(`/hotels/${id}/nearby`);
}

export default Api; 
