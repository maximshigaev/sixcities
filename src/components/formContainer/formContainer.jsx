import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {fetchReview, resetReviewError} from '../../actions/reviews.js';
import Spinner from '../spinner/spinner.jsx';
import {hasUserReview} from '../../selectors.js';
import Form from '../form/form.jsx';
import ErrorIndicator from '../errorIndicator/errorIndicator.jsx';

const FormContainer = ({isLoggedIn, fetchReview, id, isReviewLoading, isReviewError, hasUserReview,
    resetReviewError}
) => {
    useEffect(() => {        
        resetReviewError();
    }, [id, resetReviewError]);

    if(!isLoggedIn || hasUserReview) {        
        return null;
    }

    if(isReviewLoading) {
        return <Spinner />;
    }

    if(isReviewError) {
        return <ErrorIndicator operation="uploading of your review" />;
    }

    const formSubmitHandler = (evt, rating, comment) => {
        evt.preventDefault();

        const userData = {
            rating,
            comment
        }
        
        fetchReview(userData, id);
    }
    
    return <Form onSubmit={formSubmitHandler} />;
}

FormContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    fetchReview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    isReviewLoading: PropTypes.bool.isRequired,
    isReviewError: PropTypes.bool.isRequired,
    hasUserReview: PropTypes.bool.isRequired,
    resetReviewError: PropTypes.func.isRequired
}

const mapStateToProps = ({auth: {isLoggedIn, email}, reviews:{isReviewLoading, isReviewError, reviews}}) => {
    return {
        isLoggedIn,
        isReviewLoading,
        isReviewError,
        hasUserReview: hasUserReview(email, reviews, isLoggedIn)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReview: bindActionCreators(fetchReview, dispatch),
        resetReviewError: bindActionCreators(resetReviewError, dispatch)
    }
}

export {FormContainer};
export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
