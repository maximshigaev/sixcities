import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import Card from '../card/card.jsx';
import fetchNearbyHotels from '../../actions/nearby.js';
import Spinner from '../spinner/spinner.jsx';

const NearbyHotels = ({nearbyHotels, isNearbyError, isNearbyLoading, id, fetchNearbyHotels}) => {
    useEffect(() => {
        fetchNearbyHotels(id);
    }, [fetchNearbyHotels, id]);

    if(isNearbyLoading) {
        return <Spinner />;
    }

    return (
        <div className="container">
            <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                    {
                         nearbyHotels.map((item) => {
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
    id: PropTypes.number.isRequired,
    isNearbyError: PropTypes.bool.isRequired,
    isNearbyLoading: PropTypes.bool.isRequired,
    fetchNearbyHotels: PropTypes.func.isRequired,
    nearbyHotels: PropTypes.arrayOf(PropTypes.shape({
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

const mapStateToProps = ({nearby: {nearbyHotels, isNearbyError, isNearbyLoading}}) => {
    return {
        nearbyHotels,
        isNearbyError,
        isNearbyLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNearbyHotels: bindActionCreators(fetchNearbyHotels, dispatch)
    }
}

export {NearbyHotels};
export default connect(mapStateToProps, mapDispatchToProps)(NearbyHotels);
