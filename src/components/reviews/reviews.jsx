import React from 'react';
import PropTypes from 'prop-types';

import mapMonthToNubmer from '../../utils/mapMonthToNumber.js';

const Reviews = ({reviews}) => {    
    return (
        reviews.slice(0, 10)
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map((item) => {
                const {id, user, rating, comment, date} = item;
                const dateObj = new Date(Date.parse(date));
                const month = dateObj.getMonth();
                const year = dateObj.getFullYear();

                return (
                    <li key={id} className="reviews__item">
                        <div className="reviews__user user">
                            <div className="reviews__avatar-wrapper user__avatar-wrapper">
                                <img className="reviews__avatar user__avatar" src={user.avatar_url}
                                    width="54" height="54" alt="Reviews avatar"
                                />
                            </div>
                            <span className="reviews__user-name">{user.name}</span>
                        </div>
                        <div className="reviews__info">
                            <div className="reviews__rating rating">
                                <div className="reviews__stars rating__stars">
                                    <span style={{width: `${20 * rating}%`}}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                            </div>
                            <p className="reviews__text">{comment}</p>
                            <time className="reviews__time" dateTime={`${year}-${month + 1}-${dateObj.getDate()}`}>
                                {`${mapMonthToNubmer(month)} ${year}`}
                            </time>
                        </div>
                    </li>
                );
            })
    );
}

Reviews.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            is_pro: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired
        }),
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    }))
}

export default Reviews;
