const sortBy = (sortingType) => {
    return {
        type: `SORT_BY`,
        payload: sortingType
    };
}

const activeCityChange = (city) => {
    return {
        type: `ACTIVE_CITY_CHANGE`,
        payload: city
    }
}

const focusCard = (id) => {
    return {
        type: `FOCUS_CARD`,
        payload: id
    }
}

const blurCard = () => {
    return {
        type: `BLUR_CARD`
    }
}

const setCurrentHotel = (hotel) => {
    return {
        type: `SET_CURRENT_HOTEL`,
        payload: hotel
    }
}

export {sortBy, activeCityChange, focusCard, blurCard, setCurrentHotel};
