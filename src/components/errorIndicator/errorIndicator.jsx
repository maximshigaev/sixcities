import React from 'react';
import PropTypes from 'prop-types';

const ErrorIndicator = ({operation}) => {
    return (
        <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">We're sorry</b>
            <p className="cities__status-description">
                It's been an error during the process of {operation}. Please, reload the page and try again  
            </p>
        </div>
    );
}

ErrorIndicator.propTypes = {
   operation: PropTypes.string.isRequired 
}

export default ErrorIndicator;
