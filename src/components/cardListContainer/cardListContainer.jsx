import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Spinner from '../spinner/spinner.jsx';
import {hasOffers, hotelsByCity} from '../../selectors.js';
import fetchOffers from '../../actions/offers.js';
import CardList from '../cardList/cardList.jsx';
import CardListEmpty from '../cardListEmpty/cardListEmpty.jsx';
import ErrorIndicator from '../errorIndicator/errorIndicator.jsx';

const CardListContainer = ({fetchOffers, offers, isLoading, activeCity, isError}) => {
    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    if(isLoading) {
        return <Spinner />;
    }

    if(isError) {
        return <ErrorIndicator operation="loading of the list of offers" />;
    }

    if(!offers.length) {
        return <CardListEmpty city={activeCity} />;
    }

    return <CardList offers={offers} />;
}

CardListContainer.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
        is_favorite: PropTypes.bool.isRequired,
        is_premium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        preview_image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })),
    isLoading: PropTypes.bool.isRequired,
    hasOffers: PropTypes.bool.isRequired,
    activeCity: PropTypes.string,
    fetchOffers: PropTypes.func.isRequired
}

const mapStateToProps = ({offers}) => {
    return {
        offers: hotelsByCity(offers),
        isLoading: offers.isLoading,
        hasOffers: hasOffers(offers),
        activeCity: offers.activeCity,
        isError: offers.isError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffers: bindActionCreators(fetchOffers, dispatch)
    }
}

export {CardListContainer};
export default connect(mapStateToProps, mapDispatchToProps)(CardListContainer);
