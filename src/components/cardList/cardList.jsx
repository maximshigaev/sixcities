import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card.jsx';

const CardList = ({offers}) => {
    return (
        <div className="cities__places-list places__list tabs__content">
            {
                offers.map((offer) => {
                    return (
                        <Card key={offer.id} offer={offer} isNearby={false} isMain={true} isFavPage={false} />
                    );
                })
            }
        </div>
    );
}

CardList.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
        is_favorite: PropTypes.bool.isRequired,
        is_premium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        preview_image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }))
}

export default CardList;
