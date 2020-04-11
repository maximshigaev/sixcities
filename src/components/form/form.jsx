import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {fetchReview} from '../../actions.js';

const Form = ({isLoggedIn, fetchReview, currentHotel}) => {
    const [value, setValue] = useState(``);

    if (!isLoggedIn) {
        return null;
    }

    const formSubmitHandler = (evt) => {
        evt.preventDefault();

        const userData = {
            rating: evt.target.rating.value,
            comment: value
        }
        
        fetchReview(userData, currentHotel.id);
    }

    return (
        <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
            <label className="reviews__label form__label" htmlFor="review">Your review</label>
            <div className="reviews__rating-form form__rating">
                <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars"
                    type="radio"
                />
                <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                    </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
                    type="radio"
                />
                <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                    <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                    </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
                    type="radio"
                />
                <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                    <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                    </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
                    type="radio"
                />
                <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                    <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                    </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
                    type="radio"
                />
                <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                    <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                    </svg>
                </label>
            </div>
            <textarea className="reviews__textarea form__textarea" id="review" name="review"
                onChange={(evt) => setValue(evt.target.value)} value={value}
                placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and
                    describe your stay with at least <b className="reviews__text-amount">
                    50 characters</b>.
                </p>
                <button className="reviews__submit form__submit button" type="submit"
                    disabled={!(value.length >= 50 && value.length <= 300)}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

Form.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    fetchReview: PropTypes.func.isRequired,
    currentHotel: PropTypes.shape({
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

const mapStateToProps = ({isLoggedIn, currentHotel}) => {
    return {
        isLoggedIn,
        currentHotel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReview: bindActionCreators(fetchReview, dispatch)
    }
}

export {Form};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
