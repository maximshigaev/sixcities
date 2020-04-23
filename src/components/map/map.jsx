import React from 'react';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

import Spinner from '../spinner/spinner.jsx';
import {activeCityCoords, hotelsByCity} from '../../selectors.js';
import getHotelsCoords from '../../utils/getHotelsCoords.js';

import activeIcon from './pin-active.svg';
import icon from './pin.svg';

class Map extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
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

    static createIcon = (iconUrl) => {
        return leaflet.icon({
            iconUrl,
            iconSize: [30, 30]
        });
    }

    static createMarker = (coords, icon, path, map, options) => {
        const marker = leaflet.marker(coords, {
            icon,
            ...options
        })
        .addTo(map)
        .addEventListener(`click`, () => this.pushPathToHistory(path));

        return marker;
    }

    lastFocusedHotel = null;

    componentDidUpdate(prevProps) {
        const {activeCityCoords, activeCity, hotels, focusedCard, isLoading} = this.props;

        if(prevProps.activeCity === activeCity && prevProps.focusedCard === focusedCard) {
            return;
        }

        if(isLoading) {
            return;
        }

        if(this.map) {
            this.map.remove();
        }
                        
        const pin = Map.createIcon(icon);
        const activePin = Map.createIcon(activeIcon);

        const zoom = 13;

        const map = leaflet.map(`map`, {
            center: activeCityCoords,
            zoom,
            zoomControl: false,
            marker: true
        });

        if(this.lastFocusedHotel) {
            map.setView([this.lastFocusedHotel.location.latitude, this.lastFocusedHotel.location.longitude], zoom);
        } else {
            map.setView(activeCityCoords, zoom);
        }
  
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, { 
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
                contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
            .addTo(map);

        const hotelsCoords = getHotelsCoords(hotels);
            
        if(focusedCard) {
            this.lastFocusedHotel = hotels.find((item) => item.id === focusedCard);
        }
        
        hotelsCoords.forEach((coords, ind) => {
            if(this.lastFocusedHotel && coords[0] === this.lastFocusedHotel.location.latitude
                && coords[1] === this.lastFocusedHotel.location.longitude
            ) {
                map.setView(coords, zoom);

                Map.createMarker(coords, activePin, `/offer/${this.lastFocusedHotel.id}`, map,
                    {title: this.lastFocusedHotel.title, zIndexOffset: 1}
                );
                    
            } else {
                Map.createMarker(coords, pin, `/offer/${hotels[ind].id}`, map,  {title: hotels[ind].title});
            }
        });

        this.map = map;
    }

    pushPathToHistory = (path) => this.props.history.push(path);

    render() {
        const {isLoading} = this.props;

        if(isLoading) {
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

const mapStateToProps = ({offers, card}) => {
    return {
        activeCityCoords: activeCityCoords(offers),
        isLoading: offers.isLoading,
        activeCity: offers.activeCity,
        hotels: hotelsByCity(offers),
        focusedCard: card.focusedCard
    }
}

export {Map};
export default compose(connect(mapStateToProps), withRouter)(Map);
