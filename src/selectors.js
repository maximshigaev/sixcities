const hasOffers = (state) => !!state.offers.length && !state.isError;

const citiesNames = (state) => {
    const names = state.offers.map((item) => item.city.name);
    
    return Array.from(new Set(names));
}

const hotelsByCity = (state) => {
    const filteredHotels = state.offers.filter((item) => item.city.name === state.activeCity);
    
    return filteredHotels;
}

export {hasOffers, citiesNames, hotelsByCity};
