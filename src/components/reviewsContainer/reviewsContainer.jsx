import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {fetchReviews} from '../../actions/reviews.js';
import Spinner from '../spinner/spinner.jsx';
import FormContainer from '../formContainer/formContainer.jsx';
import Reviews from '../reviews/reviews.jsx';
import ErrorIndicator from '../errorIndicator/errorIndicator.jsx';

const ReviewsContainer = ({reviews, isReviewsLoading, isReviewsError, id, fetchReviews}) => {
    useEffect(() => {
        fetchReviews(id);
    }, [fetchReviews, id]);
    
    if(isReviewsLoading) {
        return <Spinner />;
    } 
    if(isReviewsError) {
        return <ErrorIndicator operation="loading of the list of reviews" />;
    }

    return (
        <section className="property__reviews reviews">
            <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <ul className="reviews__list">
                <Reviews reviews={reviews} />

                <FormContainer id={id} />
            </ul>
        </section>
    );
}

ReviewsContainer.propTypes = {
    id: PropTypes.number.isRequired,
    fetchReviews: PropTypes.func.isRequired,
    isReviewsError: PropTypes.bool.isRequired,
    isReviewsLoading: PropTypes.bool.isRequired,
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

const mapStateToProps = ({reviews: {isReviewsError, isReviewsLoading, reviews}}) => {
    return {
        isReviewsError,
        isReviewsLoading,
        reviews
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        fetchReviews: bindActionCreators(fetchReviews, dispatch)
    }
}

export {ReviewsContainer};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
