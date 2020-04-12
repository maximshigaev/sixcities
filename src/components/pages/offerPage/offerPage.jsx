import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import Header from '../../header/header.jsx';
import Offer from '../../offer/offer.jsx';
import Spinner from '../../spinner/spinner.jsx';
import NearbyHotels from '../../nearbyHotels/nearbyHotels.jsx';
import fetchOffers from '../../../actions/offers.js';

const OfferPage = ({match, offers, isLoading, history, fetchOffers}) => {   
    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    if (isLoading) {
        return (
            <div className="page">
                <Header isMain={false} />
                <Spinner />
            </div>
        );
    }   

    const offer = offers.find((item) => item.id === +match.params.id);
    
    return (
        <div className="page">
            <Header isMain={false} />
            <Offer offer={offer} history={history} />
            <NearbyHotels id={offer.id} />
        </div>
    );
}

OfferPage.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
        is_favorite: PropTypes.bool.isRequired,
        is_premium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf([`room`, `house`, `hotel`, `apartment`]).isRequired,
        preview_image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        bedrooms: PropTypes.number.isRequired,
        max_adults: PropTypes.number.isRequired,
        goods: PropTypes.arrayOf(PropTypes.string).isRequired,
        host: PropTypes.object.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired
        })
    })),
    match: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    fetchOffers: PropTypes.func.isRequired
}

const mapStateToProps = ({offers: {offers, isLoading}}) => {
    return {
        offers,
        isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffers: bindActionCreators(fetchOffers, dispatch)
    }
}

export {OfferPage};
export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(OfferPage);
