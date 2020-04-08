import offers from './mocks/offers.js';

const getOffers = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            (Math.random() > 0.25)
                ? resolve(Promise.resolve(offers))
                : reject(new Error(`Data is not available`));
        }, 1000);
    });
}

export default getOffers;
