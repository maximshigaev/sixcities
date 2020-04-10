import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CardList from '../../cardList/cardList.jsx';
import Header from '../../header/header.jsx';
import Navigation from '../../navigation/navigation.jsx';
import Filter from '../../filter/filter.jsx';
import {hasOffers} from '../../../selectors.js';
import Map from '../../map/map.jsx';

const MainPage = ({hasOffers}) => {
    const divClassName = (!hasOffers)
        ? `cities__places-container container cities__places-container--empty`
        : `cities__places-container container`;
    const sectionClassName = (!hasOffers)
        ? `cities__no-places`
        : `cities__places places`;

    return (
        <div className="page page--gray page--main">
            <Header />

            <main className="page__main page__main--index">
                <Navigation />

                <div className="cities">
                    <div className={divClassName}>
                        <section className={sectionClassName}>
                            {(!hasOffers) ? null : <Filter />}
                            
                            <CardList />
                        </section>
                        <Map />
                    </div>
                </div>
            </main> 
        </div>
    );
}

MainPage.propTypes = {
    hasOffers: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        hasOffers: hasOffers(state)
    };
}

export {MainPage};
export default connect(mapStateToProps, () => ({}))(MainPage);
