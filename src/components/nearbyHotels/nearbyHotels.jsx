import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.jsx';

const NearbyHotels = ({hotels}) => {
     return (
        <div className="container">
            <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                    {
                         hotels.map((item) => {
                            return (
                                <Card key={item.id} offer={item} isNearby={true} />
                            );
                        })
                    }
                </div>
            </section>
         </div>
    );
}

NearbyHotels.propTypes = {
    hotels: PropTypes.arrayOf(PropTypes.shape({
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

export default NearbyHotels;
