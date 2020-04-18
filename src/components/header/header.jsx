import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import logo from './logo.svg';

const Header = ({isLoggedIn, email, isMain, isAuthStatusLoading, isAuthStatusError}) => {
    const spanClassName = (isLoggedIn) ? `header__user-name user__name` : `header__login`;
    let logoLink;
    let mainLink;

    if(isMain) {
        logoLink = (
            <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
            </a>
        );
    } else {
        logoLink = (
            <Link to="/" className="header__logo-link" title="To the main page">
                <img className="header__logo" src={logo} alt="6 cities logo" width="81"height="41" />
            </Link>
        );
    }    

    if(isAuthStatusLoading) {
        mainLink = <div>Authorization...</div>;
    } else if(isAuthStatusError) {
        mainLink = <div>Authorization failed. Please, reload the page and try again</div>;
    } else {
        mainLink = (
            <Link to={(isLoggedIn) ? `/favorites` : `/login`}
                title={(isLoggedIn) ? `To the favorites page` : `To the login page`}
                className="header__nav-link header__nav-link--profile"
            >
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className={spanClassName}>{(isLoggedIn) ? email : `Sign in`}</span>
            </Link>
        );
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">{logoLink}</div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-item user">{mainLink}</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
    isMain: PropTypes.bool.isRequired,
    isAuthStatusError: PropTypes.bool.isRequired,
    isAuthStatusLoading: PropTypes.bool.isRequired
}

const mapStateToProps = ({auth: {isLoggedIn, email, isAuthStatusError, isAuthStatusLoading}}) => {
    return {
        isLoggedIn,
        email,
        isAuthStatusError,
        isAuthStatusLoading
    }
}

export {Header};
export default connect(mapStateToProps)(Header);
