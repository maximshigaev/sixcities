import React, {useEffect} from 'react';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

import getHotelsCoords from '../../utils/getHotelsCoords.js';

import activeIcon from './pin-active.svg';
import icon from './pin.svg';

const ReviewsMap = ({offer, nearbyHotels, focusedCard, history, isTestMode}) => {
    useEffect(() => {
        if(!isTestMode) {
            const offerCoords = [offer.location.latitude, offer.location.longitude];

            const activePin = createIcon(activeIcon);
            const pin = createIcon(icon);

            const zoom = 13;

            const map = leaflet.map(`reviewsMap`, {
                center: offerCoords,
                zoom,
                zoomControl: false,
                marker: true
            });

            leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, { 
                attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
                    contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
                })
                    .addTo(map);

            let focusedHotel = null;

            if(focusedCard) {
                focusedHotel = nearbyHotels.find((item) => item.id === focusedCard);

                createMarker(offerCoords, pin, map);
            } else {
                map.setView(offerCoords, zoom); 
                
                createMarker(offerCoords, activePin, map, {title: offer.title, zIndexOffset: 1});
            }

            const nearbyHotelsCoords = getHotelsCoords(nearbyHotels);

            nearbyHotelsCoords.forEach((coords, ind) => {
                if(focusedHotel && coords[0] === focusedHotel.location.latitude
                    && coords[1] === focusedHotel.location.longitude
                ) {
                    map.setView(coords, zoom);

                    createMarker(coords, activePin, map, {zIndexOffset: 1});
                } else {
                    createMarker(coords, pin, map, {title: nearbyHotels[ind].title})
                        .addEventListener(`click`, () => history.push(`/offer/${nearbyHotels[ind].id}`));
                }
            });
            return () => map.remove();
        }
    }, [offer, nearbyHotels, focusedCard, history, isTestMode]);

    const createIcon = (iconUrl) => {
        return leaflet.icon({
            iconUrl,
            iconSize: [30, 30]
        });
    }

    const createMarker = (coords, icon, map, options = {}) => {
        const marker = leaflet.marker(coords, {
            icon,
            ...options
        })
        .addTo(map);

        return marker;
    }

    return (
        <section className="property__map map">
            <div id="reviewsMap" style={{width: `100%`, height: `100%`}}></div>
        </section>
    );
}

ReviewsMap.propTypes = {
    isTestMode: PropTypes.bool.isRequired,
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
    focusedCard: PropTypes.number,
    history: PropTypes.object.isRequired,
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

const mapStateToProps = ({nearby: {nearbyHotels}, card: {focusedCard}, offers: {isTestMode = false}}) => {
    return {
        nearbyHotels,
        focusedCard,
        isTestMode
    }
}

export {ReviewsMap};
export default compose(connect(mapStateToProps), withRouter)(ReviewsMap);
