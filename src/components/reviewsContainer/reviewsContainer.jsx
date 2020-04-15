import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {fetchComments} from '../../actions/comments.js';
import Spinner from '../spinner/spinner.jsx';
import FormContainer from '../formContainer/formContainer.jsx';
import Reviews from '../reviews/reviews.jsx';

const ReviewsContainer = ({comments, isCommentsLoading, isCommentsError, id, fetchComments}) => {
    useEffect(() => {
        fetchComments(id);
    }, [fetchComments, id]);    

    return (
        <section className="property__reviews reviews">
            <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{comments.length}</span>
            </h2>
            <ul className="reviews__list">
                {(isCommentsLoading) ? <Spinner /> : <Reviews reviews={comments} />}\
                
                <FormContainer id={id} />
            </ul>
        </section>
    );
}

ReviewsContainer.propTypes = {
    id: PropTypes.number.isRequired,
    fetchComments: PropTypes.func.isRequired,
    isCommentsError: PropTypes.bool.isRequired,
    isCommentsLoading: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
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

const mapStateToProps = ({comments: {isCommentsError, isCommentsLoading, comments}}) => {
    return {
        isCommentsError,
        isCommentsLoading,
        comments
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        fetchComments: bindActionCreators(fetchComments, dispatch)
    }
}

export {ReviewsContainer};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
