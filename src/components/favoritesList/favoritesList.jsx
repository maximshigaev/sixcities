import React  from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.jsx';

const FavoritesList = ({favorites}) => {
    const favoriteCities = Array.from(new Set(favorites.map((item) => item.city.name)))
        .sort();    

    return (
        <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
                <section className="favorites">
                    <h1 className="favorites__title">Saved listing</h1>
                    <ul className="favorites__list">
                        {
                            favoriteCities.map((item) => {
                                const hotels = favorites.filter((hotel) => hotel.city.name === item)
                                    .map((elem) => {
                                        return (
                                             <Card key={elem.id} offer={elem} isNearby={false} isMain={false}
                                                isFavPage={true}
                                            />
                                        );
                                });

                                return (
                                    <li key={item} className="favorites__locations-items">
                                        <div className="favorites__locations locations locations--current">
                                            <div className="locations__item">
                                                <a className="locations__item-link" href="#">
                                                    <span>{item}</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="favorites__places">{hotels}</div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </section>
            </div>
        </main>
    );
}

FavoritesList.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape({
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

export default FavoritesList;
