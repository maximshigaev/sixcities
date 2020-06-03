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
import FavoritesListEmpty from '../../favoritesListEmpty/favoritesListEmpty.jsx';
import ErrorIndicator from '../../errorIndicator/errorIndicator.jsx';

import logo from './logo.svg';

const FavoritesPage = ({favorites, isFavoritesLoading, isFavoritesError, isLoggedIn, fetchFavorites}) => {
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    if(!isLoggedIn) {
        return <Redirect to={`${process.env.PUBLIC_URL}/login`} />;
    }

    if(isFavoritesLoading) {
        return <Spinner />;
    }

    if(isFavoritesError) {
        return <ErrorIndicator operation="loading of the list of favorite offers" />;
    }

    const divClassName = cn(`page`, {'page--favorites-empty': !favorites.length});

    return (
        <div className={divClassName}>
            <Header isMain={false} />

            {(favorites.length) ? <FavoritesList favorites={favorites} /> : <FavoritesListEmpty />}
            
            <footer className="footer">
                <Link to={`${process.env.PUBLIC_URL}/`} className="footer__logo-link" title="To the main page">
                    <img className="footer__logo" src={logo} alt="6 cities logo" width="64" height="33" />
                </Link>
            </footer>
        </div>
    );
}

FavoritesPage.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
        is_favorite: PropTypes.bool.isRequired,
        is_premium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        preview_image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })),
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
