import React, {useEffect}  from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {Link, Redirect} from 'react-router-dom';
import cn from 'classnames';

import {fetchFavorites} from '../../../actions/favorites.js';
import Spinner from '../../spinner/spinner.jsx';
import Header from '../../header/header.jsx';
import FavoritesList from '../../favoritesList/favoritesList.jsx';

import logo from './logo.svg';

const FavoritesPage = ({favorites, isFavoritesLoading, isFavoritesError, isLoggedIn, fetchFavorites}) => {
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    if(!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    if(isFavoritesLoading) {
        return <Spinner />;
    }

    const divClassName = cn(`page`, {'page--favorites-empty': !favorites.length});

    return (
        <div className={divClassName}>
            <Header isMain={false} />
            <FavoritesList />
            <footer className="footer">
                <Link to="/" className="footer__logo-link" title="To the main page">
                    <img className="footer__logo" src={logo} alt="6 cities logo" width="64" height="33" />
                </Link>
            </footer>
        </div>
    );
}

FavoritesPage.propTypes = {
    favorites: PropTypes.array,
    fetchFavorites: PropTypes.func.isRequired,
    isFavoritesLoading: PropTypes.bool.isRequired,
    isFavoritesError: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = ({favorites: {favorites, isFavoritesLoading, isFavoritesError}, auth: {isLoggedIn}}) => {
    return {
        favorites,
        isFavoritesLoading, 
        isFavoritesError,
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavorites: bindActionCreators(fetchFavorites, dispatch)
    }
}

export {FavoritesPage};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
