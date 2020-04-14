import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {fetchReview} from '../../actions/comments.js';
import Spinner from '../spinner/spinner.jsx';

const Form = ({isLoggedIn, fetchReview, id, isReviewLoading, isReviewError}) => {
    const [commentValue, setCommentValue] = useState(``);
    const [ratingValue, setRatingValue] = useState(``);

    if(!isLoggedIn) {
        return null;
    }

    if(isReviewLoading) {
        return <Spinner />;
    }

    const formSubmitHandler = (evt) => {
        evt.preventDefault();

        const userData = {
            rating: ratingValue,
            comment: commentValue
        }
        
        fetchReview(userData, id);
    }

    const titles = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

    return (
        <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
            <label className="reviews__label form__label" htmlFor="review">Your review</label>
            <div className="reviews__rating-form form__rating">
                {
                    titles.map((item, ind) => {
                        return (
                            <React.Fragment key={item}>
                                <input className="form__rating-input visually-hidden" name="rating" value={5 - ind} 
                                    id={`${5 - ind}-stars`} type="radio"
                                    onChange={(evt) => setRatingValue(evt.target.value)}
                                />
                                <label htmlFor={`${5 - ind}-stars`} className="reviews__rating-label form__rating-label"
                                    title={item}
                                >
                                    <svg className="form__star-image" width="37" height="33">
                                        <use xlinkHref="#icon-star"></use>
                                    </svg>
                                </label>
                            </React.Fragment>
                        );
                    })
                }
            </div>
            <textarea className="reviews__textarea form__textarea" id="review" name="review"
                onChange={(evt) => setCommentValue(evt.target.value)} value={commentValue}
                placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and
                    describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button className="reviews__submit form__submit button" type="submit" title="Submit review"
                    disabled={!(commentValue.length >= 50 && commentValue.length <= 300) || !ratingValue}
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
    id: PropTypes.number.isRequired,
    isReviewLoading: PropTypes.bool.isRequired,
    isReviewError: PropTypes.bool.isRequired
}

const mapStateToProps = ({auth: {isLoggedIn}, comments:{isReviewLoading, isReviewError}}) => {
    return {
        isLoggedIn,
        isReviewLoading,
        isReviewError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReview: bindActionCreators(fetchReview, dispatch)
    }
}

export {Form};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
