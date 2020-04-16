import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Form = ({onSubmit}) => {
    const [commentValue, setCommentValue] = useState(``);
    const [ratingValue, setRatingValue] = useState(``);

    const titles = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
    const MIN_REVIEW_LENGTH = 50;
    const MAX_REVIEW_LENGTH = 300;
    const isDisabled = !(commentValue.length >= MIN_REVIEW_LENGTH && commentValue.length <= MAX_REVIEW_LENGTH)
        || !ratingValue;

    return (
        <form className="reviews__form form" action="#" method="post"
            onSubmit={(evt) => onSubmit(evt, ratingValue, commentValue)}
        >
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
                    disabled={isDisabled}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Form;
