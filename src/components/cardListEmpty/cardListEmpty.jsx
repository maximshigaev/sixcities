import React from 'react';
import PropTypes from 'prop-types';

const CardListEmpty = ({city}) => {
    return (
        <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the
                moment in {city}
            </p>
        </div>
    );
}

CardListEmpty.propTypes = {
    city: PropTypes.string
}

export default CardListEmpty;
