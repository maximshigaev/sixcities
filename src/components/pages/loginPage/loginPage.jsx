import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Header from '../../header/header.jsx';
import {fetchAuth} from '../../../actions/auth.js';
import Spinner from '../../spinner/spinner.jsx';
import Login from '../../login/login.jsx';
import ErrorIndicator from '../../errorIndicator/errorIndicator.jsx';

const LoginPage = ({isLoggedIn, isAuthLoading, fetchAuth, isAuthError}) => {
    const formSubmitHandler = (evt, email, password) => {
        evt.preventDefault();

        fetchAuth({
            email,
            password
        });
    }

    if(isLoggedIn) {
        return <Redirect to="/" />;
    }

    if(isAuthLoading) {
        return <Spinner />;
    }

    if(isAuthError) {
        return <ErrorIndicator operation="user's authorization" />;
    }

    return (
        <div className="page page--gray page--login">
            <Header isMain={false} />

            <Login onSubmit={formSubmitHandler} />
        </div>
    );
}

LoginPage.propTypes = {
    fetchAuth: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
    isAuthError: PropTypes.bool.isRequired
}

const mapStateToProps = ({auth: {isLoggedIn, isAuthLoading, isAuthError}}) => {
    return {
        isLoggedIn,
        isAuthLoading,
        isAuthError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAuth: ({email, password}) => dispatch(fetchAuth({email, password}))
    } 
}

export {LoginPage};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
