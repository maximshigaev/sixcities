import React  from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const FavoritesList = ({favorites}) => {
    if(!favorites.length) {
        return (
            <main className="page__main page__main--favorites page__main--favorites-empty">
                <div className="page__favorites-container container">
                    <section className="favorites favorites--empty">
                        <h1 className="visually-hidden">Favorites (empty)</h1>
                        <div className="favorites__status-wrapper">
                            <b className="favorites__status">Nothing yet saved.</b>
                            <p className="favorites__status-description">
                                Save properties to narrow down search or plan yor future trips.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
    
    const favoriteCities = Array.from(new Set(favorites.map((item) => item.city.name)))
        .sort()    

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
                                        const {id, preview_image, price, rating, title, type} = elem;

                                        return (
                                            <article key={id} className="favorites__card place-card">
                                                <div className="favorites__image-wrapper place-card__image-wrapper">
                                                    <a href="#">
                                                        <img className="place-card__image" src={preview_image}
                                                            width="150" height="110" alt="Place"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="favorites__card-info place-card__info">
                                                    <div className="place-card__price-wrapper">
                                                        <div className="place-card__price">
                                                            <b className="place-card__price-value">&euro;{price}</b>
                                                            <span className="place-card__price-text">
                                                                &#47;&nbsp;night
                                                            </span>
                                                        </div>
                                                        <button className="place-card__bookmark-button
                                                            place-card__bookmark-button--active button" type="button"
                                                        >
                                                            <svg className="place-card__bookmark-icon" width="18"
                                                                height="19"
                                                            >
                                                                <use xlinkHref="#icon-bookmark"></use>
                                                            </svg>
                                                            <span className="visually-hidden">In bookmarks</span>
                                                        </button>
                                                    </div>
                                                    <div className="place-card__rating rating">
                                                        <div className="place-card__stars rating__stars">
                                                            <span style={{width: `${20 * rating}%`}}></span>
                                                            <span className="visually-hidden">Rating</span>
                                                        </div>
                                                    </div>
                                                    <h2 className="place-card__name">
                                                        <Link to={`/offer/${id}`}>{title}</Link>
                                                    </h2>
                                                    <p className="place-card__type">{type}</p>
                                                </div>
                                            </article>
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
                                        <div className="favorites__places">
                                            {hotels}
                                        </div>
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

FavoritesList.propTypes ={
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

const mapStateToProps = ({favorites: {favorites}}) => {
    return {
       favorites 
    }
}

export {FavoritesList};
export default connect(mapStateToProps, null)(FavoritesList);
