import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {focusCard, blurCard} from '../../actions.js';

const Card = ({offer: {price, is_favorite: isFavourite, is_premium: isPremium, rating, title, type,
    preview_image: src, id},cardMouseEnterHandler, cardMouseLeaveHandler}, isNearby) => {

    const btnClassName = (isFavourite)
        ? `place-card__bookmark-button place-card__bookmark-button--active button`
        : `place-card__bookmark-button button`;
    const articleClassName = (isNearby)
        ? `near-places__card place-card`
        : `cities__place-card place-card`;
    const divClassName = (isNearby)
        ? `near-places__image-wrapper place-card__image-wrapper`
        : `cities__image-wrapper place-card__image-wrapper`;
        
    return (
        <article className={articleClassName} onMouseEnter={() => cardMouseEnterHandler(id)}
            onMouseLeave={cardMouseLeaveHandler}
        >
            {(isPremium) ? <div className="place-card__mark"><span>Premium</span></div> : null}

            <div className={divClassName}>
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
                            <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">{(isFavourite) ? `In bookmarks` : `To bookmarks`}</span>
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
    )
}

Card.propTypes = {
    cardMouseEnterHandler: PropTypes.func,
    cardMouseLeaveHandler: PropTypes.func,
    isNearby: PropTypes.bool.isRequired,
    offer: PropTypes.shape({
        price: PropTypes.number.isRequired,
        is_favorite: PropTypes.bool.isRequired,
        is_premium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        preview_image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        cardMouseEnterHandler: (id) => dispatch(focusCard(id)),
        cardMouseLeaveHandler: () => dispatch(blurCard())
    }
}

export {Card};
export default connect(() => ({}), mapDispatchToProps)(Card);
