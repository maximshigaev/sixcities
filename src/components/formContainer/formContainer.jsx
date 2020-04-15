import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {fetchReview, resetReviewError} from '../../actions/comments.js';
import Spinner from '../spinner/spinner.jsx';
import {hasUserComment} from '../../selectors.js';
import Form from '../form/form.jsx';

const FormContainer = ({isLoggedIn, fetchReview, id, isReviewLoading, isReviewError, hasUserComment,
    resetReviewError}
) => {
    useEffect(() => {        
        resetReviewError();
    }, [id, resetReviewError]);

    if(!isLoggedIn || hasUserComment) {        
        return null;
    }

    if(isReviewLoading) {
        return <Spinner />;
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
    hasUserComment: PropTypes.bool.isRequired,
    resetReviewError: PropTypes.func.isRequired
}

const mapStateToProps = ({auth: {isLoggedIn, email}, comments:{isReviewLoading, isReviewError, comments}}) => {
    return {
        isLoggedIn,
        isReviewLoading,
        isReviewError,
        hasUserComment: hasUserComment(email, comments, isLoggedIn)
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
