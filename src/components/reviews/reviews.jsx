import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {fetchComments} from '../../actions/comments.js';
import Spinner from '../spinner/spinner.jsx';
import Form from '../form/form.jsx';
import mapMonthToNubmer from '../../utils/mapMonthToNumber.js';

const Reviews = ({comments, isCommentsLoading, isCommentsError, id, fetchComments}) => {
    useEffect(() => {
        fetchComments(id);
    }, [fetchComments, id]);    

    let reviews;

    if(isCommentsLoading) {
        reviews = <Spinner />;
    } else {
        reviews = (
            comments.slice(0, 10)
                .map((item) => {
                    const {id, user, rating, comment, date} = item;
                    const dateObj = new Date(Date.parse(date));

                    return (
                        <li key={id} className="reviews__item">
                            <div className="reviews__user user">
                                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                                    <img className="reviews__avatar user__avatar" src={user.avatar_url}
                                        width="54" height="54" alt="Reviews avatar"
                                    />
                                </div>
                                <span className="reviews__user-name">
                                    {user.name}
                                </span>
                            </div>
                            <div className="reviews__info">
                                <div className="reviews__rating rating">
                                    <div className="reviews__stars rating__stars">
                                        <span style={{width: `${20 * rating}%`}}></span>
                                        <span className="visually-hidden">Rating</span>
                                    </div>
                                </div>
                                <p className="reviews__text">
                                    {comment}
                                </p>
                                <time className="reviews__time" dateTime="2019-04-24">
                                    {`${mapMonthToNubmer(dateObj.getMonth())} ${dateObj.getFullYear()}`}
                                </time>
                            </div>
                        </li>
                    );
                })
        );
    }

    return (
        <section className="property__reviews reviews">
            <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{comments.length}</span>
            </h2>
            <ul className="reviews__list">
                {reviews}
                <Form id={id} />
            </ul>
        </section>
    );
}

Reviews.propTypes = {
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

const mapStateToProps = ({isCommentsError, isCommentsLoading, comments}) => {
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

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
