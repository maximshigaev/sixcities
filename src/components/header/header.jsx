import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Header = ({isLoggedIn, email}) => {
    const className = (isLoggedIn) ? `header__user-name user__name` : `header__login`;

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <a className="header__logo-link header__logo-link--active">
                            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81"
                                height="41"
                            />
                        </a>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-item user">
                                <Link to="/login" className="header__nav-link header__nav-link--profile">
                                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                    <span className={className}>
                                        {(isLoggedIn) ? email : `Sign in`}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string
}

const mapStateToProps = ({isLoggedIn, email}) => {
    return {
        isLoggedIn,
        email
    }
}

export {Header};
export default connect(mapStateToProps, () => ({}))(Header);
