const hasOffers = (state) => !!state.offers.length && !state.isError;

const citiesNames = (state) => Array.from(new Set(state.offers.map((item) => item.city.name)));

const hotelsByCity = (state) => state.offers.filter((item) => item.city.name === state.activeCity);

const activeCityCoords = (state) => {
    const cityHotel = state.offers.find((item) => item.city.name === state.activeCity);

    if (!cityHotel) {
        return;
    }

    return [cityHotel.city.location.latitude, cityHotel.city.location.longitude];
}

export {hasOffers, citiesNames, hotelsByCity, activeCityCoords};
