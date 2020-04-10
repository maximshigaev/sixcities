import axios from 'axios';

const api = axios.create({
	baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
});



const getOffers = () => {
    return api.get(`/hotels`);
}

const sendUserData = (userData) => {
    return api.post(`/login`, userData)
}

const getComments = (id) => {
    return api.get(`/comments/${id}`)
}

export  {getOffers, sendUserData, getComments};
