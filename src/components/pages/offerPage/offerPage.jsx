import React, {useEffect} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import Header from '../../header/header.jsx';
import Offer from '../../offer/offer.jsx';
import Spinner from '../../spinner/spinner.jsx';
import NearbyHotelsContainer from '../../nearbyHotelsContainer/nearbyHotelsContainer.jsx';
import fetchOffers from '../../../actions/offers.js';
import ErrorIndicator from '../../errorIndicator/errorIndicator.jsx';

const OfferPage = ({match, offers, isLoading, history, fetchOffers, isError}) => {   
    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [match.params.id]);

    if(isLoading) {
        return (
            <div className="page">
                <Header isMain={false} />
                <Spinner />
            </div>
        );
    }

    if(isError) {
        return (
            <div className="page">
                <Header isMain={false} />
                <ErrorIndicator operation="loading of this offer" />
            </div>
        );
    }   

    const offer = offers.find((item) => item.id === +match.params.id);
    
    if(!offer) {
        return <Redirect to="/" />;
    }
    
    return (
        <div className="page">
            <Header isMain={false} />
            <Offer offer={offer} history={history} />
            <NearbyHotelsContainer id={offer.id} />
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
    fetchOffers: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired
}

const mapStateToProps = ({offers: {offers, isLoading, isError}}) => {
    return {
        offers,
        isLoading,
        isError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffers: bindActionCreators(fetchOffers, dispatch)
    }
}

export {OfferPage};
export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(OfferPage);
