const sortOffers = (offers, type) => {
    const offersCopy = [...offers];

    switch(type) {
        case `Popular`:
            return offersCopy.sort((a, b) => a.id - b.id);
            
        case `Price: low to high`:
            return offersCopy.sort((a, b) => a.price - b.price);

        case `Price: high to low`:
            return offersCopy.sort((a, b) => b.price - a.price);

        case `Top rated first`:
            return offersCopy.sort((a, b) => b.rating - a.rating);

        default:
            return offersCopy;
    }
}

export default sortOffers;
