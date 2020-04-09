import React from 'react';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner.jsx';
import {activeCityCoords, hotelsByCity} from '../../selectors.js';
import activeIcon from './pin-active.svg';
import icon from './pin.svg';

class Map extends React.PureComponent {
    static propTypes = {
        activeCityCoords: PropTypes.arrayOf(PropTypes.number),
        activeCity: PropTypes.string,
        focusedCard: PropTypes.number,
        isLoading: PropTypes.bool.isRequired,
        hotels: PropTypes.arrayOf(PropTypes.shape({
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

    componentDidUpdate(prevProps) {
        const {activeCityCoords, activeCity, hotels, focusedCard} = this.props;

        if(prevProps.activeCity === activeCity && prevProps.focusedCard === focusedCard) {
            return;
        }

        if(this.map) {
            this.map.remove();
        }
                        
        const pin = leaflet.icon({
            iconUrl: icon,
            iconSize: [30, 30]
        });

        const zoom = 13;

        const map = leaflet.map(`map`, {
            center: activeCityCoords,
            zoom,
            zoomControl: false,
            marker: true
        });

        map.setView(activeCityCoords, zoom);

        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, { 
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
                contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
            .addTo(map);

        const hotelsCoords = this.getHotelsCoords(hotels);
        let focusedHotel = null;
            
        if(focusedCard) {
            focusedHotel = hotels.find((item) => item.id === focusedCard);
        }
        
        hotelsCoords.forEach((coords) => {
            if(focusedHotel
                && coords[0] === focusedHotel.location.latitude && coords[1] === focusedHotel.location.longitude
            ) {
                const activePin = leaflet.icon({
                    iconUrl: activeIcon,
                    iconSize: [30, 30]
                });

                map.setView(coords, zoom);

                leaflet.marker(coords, {icon: activePin})
                    .addTo(map)
            } else {
                leaflet.marker(coords, {icon: pin})
                    .addTo(map)
            }
        });

        this.map = map;
    }

    getHotelsCoords = (hotels) => hotels.map((item) => [item.location.latitude, item.location.longitude]);

    render() {
        if(this.props.isLoading) {
            return <Spinner />;
        }

        return (
            <div className="cities__right-section">
                <section className="cities__map map">
                    <div id="map" style={{width: `100%`, height: `100%`}}></div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeCityCoords: activeCityCoords(state),
        isLoading: state.isLoading,
        activeCity: state.activeCity,
        hotels: hotelsByCity(state),
        focusedCard: state.focusedCard
    }
}

export {Map};
export default connect(mapStateToProps, () => ({}))(Map);
