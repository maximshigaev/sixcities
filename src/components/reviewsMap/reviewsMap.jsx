import React, {useEffect} from 'react';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import getHotelsCoords from '../../utils/getHotelsCoords.js';

import activeIcon from './pin-active.svg';
import icon from './pin.svg';

const ReviewsMap = ({offer, nearbyHotels}) => {
    useEffect(() => {
        const offerCoords = [offer.location.latitude, offer.location.longitude];

        const activePin = leaflet.icon({
            iconUrl: activeIcon,
            iconSize: [30, 30]
        });

        const pin = leaflet.icon({
            iconUrl: icon,
            iconSize: [30, 30]
        });

        const zoom = 13;

        const map = leaflet.map(`commentsMap`, {
            center: offerCoords,
            zoom,
            zoomControl: false,
            marker: true
        });

        map.setView(offerCoords, zoom);

        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, { 
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
                contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
            .addTo(map);

        leaflet.marker(offerCoords, {icon: activePin})
            .addTo(map)

        const nearbyHotelsCoords = getHotelsCoords(nearbyHotels);

        nearbyHotelsCoords.forEach((coords) => {
            leaflet.marker(coords, {icon: pin})
                .addTo(map)
        });

        return () => map.remove();
    }, [offer, nearbyHotels]);

    return (
        <section className="property__map map">
            <div id="commentsMap" style={{width: `100%`, height: `100%`}}></div>
        </section>
    );
}

ReviewsMap.propTypes = {
        offer: PropTypes.shape({
            price: PropTypes.number.isRequired,
            is_favorite: PropTypes.bool.isRequired,
            is_premium: PropTypes.bool.isRequired,
            rating: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            preview_image: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }),
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

const  mapStateToProps = ({nearbyHotels}) => {
    return {
        nearbyHotels 
    }
}

export {ReviewsMap};
export default connect(mapStateToProps, () => ({}))(ReviewsMap);
