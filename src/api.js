import axios from 'axios';

class Api {
    api = axios.create({
        baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
        timeout: 5000,
        withCredentials: true
    });

    getOffers = () => this.api.get(`/hotels`);

    sendUserData = (userData) => this.api.post(`/login`, userData);

    requestAuth = () => this.api.get(`/login`);

    getReviews = (id) => this.api.get(`/comments/${id}`);

    sendUserReview = (review, id) => this.api.post(`/comments/${id}`, review);

    getFavorites = () => this.api.get(`/favorite`);

    setFavorite = (id, isFavorite) => this.api.post(`/favorite/${id}/${(isFavorite) ? 0 : 1}`);

    getNearbyHotels = (id) => this.api.get(`/hotels/${id}/nearby`);
}

export default new Api(); 
