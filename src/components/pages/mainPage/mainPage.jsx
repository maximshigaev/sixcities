import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CardListContainer from '../../cardListContainer/cardListContainer.jsx';
import Header from '../../header/header.jsx';
import Navigation from '../../navigation/navigation.jsx';
import Filter from '../../filter/filter.jsx';
import {hasOffers} from '../../../selectors.js';
import Map from '../../map/map.jsx';

const MainPage = ({hasOffers, isLoading}) => {
    const divClassName = cn(`cities__places-container container`,
        {'cities__places-container--empty': !isLoading && !hasOffers});

    const sectionClassName = (!isLoading && !hasOffers)
        ? `cities__no-places`
        : `cities__places places`;        

    return (
        <div className="page page--gray page--main">
            <Header isMain={true} />
            <main className="page__main page__main--index">
                <Navigation />
                <div className="cities">
                    <div className={divClassName}>
                        <section className={sectionClassName}>
                            {(!hasOffers) ? null : <Filter />}
                            
                            <CardListContainer />
                        </section>
                        <Map />
                    </div>
                </div>
            </main> 
        </div>
    );
}

MainPage.propTypes = {
    hasOffers: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = ({offers}) => {
    return {
        hasOffers: hasOffers(offers),
        isLoading: offers.isLoading
    };
}

export {MainPage};
export default connect(mapStateToProps)(MainPage);
