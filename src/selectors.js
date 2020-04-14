const hasOffers = ({offers, isError}) => !!offers.length && !isError;

const citiesNames = ({offers}) => Array.from(new Set(offers.map((item) => item.city.name))).sort().slice(0, 6);

const hotelsByCity = ({offers, activeCity}) => offers.filter((item) => item.city.name === activeCity);

const activeCityCoords = ({offers, activeCity}) => {
    const cityHotel = offers.find((item) => item.city.name === activeCity);

    if (!cityHotel) {
        return;
    }

    return [cityHotel.city.location.latitude, cityHotel.city.location.longitude];
}

export {hasOffers, citiesNames, hotelsByCity, activeCityCoords};
