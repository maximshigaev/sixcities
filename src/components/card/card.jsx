import React from 'react';
import PropTypes from 'prop-types';

const Card = ({offer: {price, isPinned, isPremium, rating, title, type, src, id},
    onMouseEnter, onMouseLeave, isHovered}) => {

    const btnClassName = (isPinned)
        ? `place-card__bookmark-button place-card__bookmark-button--active button`
        : `place-card__bookmark-button button`;
        
    return (
        <article className="cities__place-card place-card" onMouseEnter={() => onMouseEnter(id)}
            onMouseLeave={onMouseLeave}
        >
            {(isPremium) ? <div className="place-card__mark"><span>Premium</span></div> : null}
            <div className="cities__image-wrapper place-card__image-wrapper">
                <a href="#">
                    <img className="place-card__image" src={src} width="260" height="200"
                        alt="Place pic"
                    />
                </a>
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className={btnClassName} type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref={(isHovered) ? '#icon-bookmark-active' :'#icon-bookmark'}>
                            </use>
                        </svg>
                        <span className="visually-hidden">{(isPinned) ? `In bookmarks` : `To bookmarks`}</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{width: `${20 * rating}%`}}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <a href="#">{title}</a>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    )
}

Card.propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    isHovered: PropTypes.bool.isRequired,
    offer: PropTypes.shape({
        price: PropTypes.number.isRequired,
        isPinned: PropTypes.bool.isRequired,
        isPremium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })
}

export default Card;
