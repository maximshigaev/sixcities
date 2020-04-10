const hasOffers = ({offers, isError}) => !!offers.length && !isError;

const citiesNames = ({offers}) => Array.from(new Set(offers.map((item) => item.city.name)));

const hotelsByCity = ({offers, activeCity}) => offers.filter((item) => item.city.name === activeCity);

const hotelsByCurrentHotel = ({currentHotel, offers}) => {
    return offers.filter((item) => item.city.name === currentHotel.city.name && item.id !== currentHotel.id)
        .slice(0, 3);
}

const activeCityCoords = ({offers, activeCity}) => {
    const cityHotel = offers.find((item) => item.city.name === activeCity);

    if (!cityHotel) {
        return;
    }

    return [cityHotel.city.location.latitude, cityHotel.city.location.longitude];
}

export {hasOffers, citiesNames, hotelsByCity, activeCityCoords, hotelsByCurrentHotel};
