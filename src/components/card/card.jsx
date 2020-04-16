import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import {bindActionCreators} from 'redux';

import {focusCard, blurCard} from '../../actions/helpers.js';

const Card = ({offer: {price, is_premium: isPremium, is_favorite: isFavorite, rating, title, type,
    preview_image: src, id}, cardMouseEnterHandler, cardMouseLeaveHandler, isNearby, isMain, isFavPage}
) => {
    const btnClassName = cn(`place-card__bookmark-button button`, {'place-card__bookmark-button--active': isFavorite});
    const articleClassName = cn(`place-card`,
        {'near-places__card': isNearby, 'cities__place-card': isMain, 'favorites__card': isFavPage});
    const wrapperDivClassName = cn(`place-card__image-wrapper`,
        {'near-places__image-wrapper': isNearby, 'cities__image-wrapper': isMain, 'favorites__image-wrapper': isFavPage});
    const infoDivClassName = cn(`place-card__info`, {'favorites__card-info': isFavPage});

    return (
        <Link to={`/offer/${id}`} title={`To the ${title} offer page`} onClick={cardMouseLeaveHandler}>
            <article className={articleClassName} onMouseEnter={() => cardMouseEnterHandler(id)}
                onMouseLeave={cardMouseLeaveHandler}
            >
                {(isPremium) ? <div className="place-card__mark"><span>Premium</span></div> : null}

                <div className={wrapperDivClassName}>
                    <img className="place-card__image" src={src} width={(isFavPage) ? "150" : "260"}
                        height={(isFavPage) ? "110" : "200"} alt="Place pic"
                    />
                </div>
                <div className={infoDivClassName}>
                    <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                            <b className="place-card__price-value">&euro;{price}</b>
                            <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className={btnClassName} type="button"
                            title={(isFavorite) ? `In bookmarks` : `To bookmarks`}
                        >
                            <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                            </svg>
                            <span className="visually-hidden">{(isFavorite) ? `In bookmarks` : `Not in bookmarks`}</span>
                        </button>
                    </div>
                    <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                            <span style={{width: `${20 * rating}%`}}></span>
                            <span className="visually-hidden">Rating</span>
                        </div>
                    </div>
                    <h2 className="place-card__name">{title}</h2>
                    <p className="place-card__type">{type}</p>
                </div>
            </article>
        </Link>
    )
}

Card.propTypes = {
    cardMouseEnterHandler: PropTypes.func.isRequired,
    cardMouseLeaveHandler: PropTypes.func.isRequired,
    isNearby: PropTypes.bool.isRequired,
    isFavPage: PropTypes.bool.isRequired,
    isMain: PropTypes.bool.isRequired,
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
        cardMouseEnterHandler:  bindActionCreators(focusCard ,dispatch),
        cardMouseLeaveHandler:  bindActionCreators(blurCard, dispatch)
    }
}

export {Card};
export default connect(null, mapDispatchToProps)(Card);
