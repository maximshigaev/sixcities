import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import fetchNearbyHotels from '../../actions/nearby.js';
import Spinner from '../spinner/spinner.jsx';
import NearbyHotels from '../nearbyHotels/nearbyHotels.jsx';
import ErrorIndicator from '../errorIndicator/errorIndicator.jsx';

const NearbyHotelsContainer = ({nearbyHotels, isNearbyError, isNearbyLoading, id, fetchNearbyHotels}) => {
    useEffect(() => {
        fetchNearbyHotels(id);
    }, [fetchNearbyHotels, id]);

    if(isNearbyLoading) {
        return <Spinner />;
    }

    if(isNearbyError) {
        return <ErrorIndicator operation="loading the list of nearby offers" />; 
    }

    return <NearbyHotels hotels={nearbyHotels} />;
}

NearbyHotelsContainer.propTypes = {
    id: PropTypes.number.isRequired,
    isNearbyError: PropTypes.bool.isRequired,
    isNearbyLoading: PropTypes.bool.isRequired,
    fetchNearbyHotels: PropTypes.func.isRequired
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

export {NearbyHotelsContainer};
export default connect(mapStateToProps, mapDispatchToProps)(NearbyHotelsContainer);
