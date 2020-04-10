import React from 'react';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import getHotelsCoords from '../../utils/getHotelsCoords.js';
import {hotelsByCurrentHotel} from '../../selectors.js';

import activeIcon from './pin-active.svg';
import icon from './pin.svg';

class ReviewsMap extends React.PureComponent {
    static propTypes = {
        currentHotel: PropTypes.object,
        currentHotels: PropTypes.arrayOf(PropTypes.shape({
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

    componentDidMount() {
        const {currentHotel, currentHotels} = this.props;
        
        const currentHotelCoords = [currentHotel.location.latitude, currentHotel.location.longitude];

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
            center: currentHotelCoords,
            zoom,
            zoomControl: false,
            marker: true
        });

        map.setView(currentHotelCoords, zoom);

        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, { 
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
                contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
            .addTo(map);

        leaflet.marker(currentHotelCoords, {icon: activePin})
            .addTo(map)

        if (currentHotels.length) {
            const currentHotelsCoords = getHotelsCoords(currentHotels);

            currentHotelsCoords.forEach((coords) => {
                leaflet.marker(coords, {icon: pin})
                    .addTo(map)
            });
        }
    }

    render() {
        return (
            <section className="property__map map">
                <div id="commentsMap" style={{width: `100%`, height: `100%`}}></div>
            </section>
        );
    }
}

const  mapStateToProps = (state) => {
    return {
        currentHotel: state.currentHotel,
        currentHotels: hotelsByCurrentHotel(state)
    }
}

export {ReviewsMap};
export default connect(mapStateToProps, () => ({}))(ReviewsMap);
