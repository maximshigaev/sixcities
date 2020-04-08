import React from 'react';

import CardList from '../../cardList/cardList.jsx';
import Header from '../../header/header.jsx';
import Navigation from '../../navigation/navigation.jsx';
import Filter from '../../filter/filter.jsx';
import offers from '../../../mocks/offers.js';

const MainPage = () => {
    return (
        <div className="page page--gray page--main">
            <Header />

            <main className="page__main page__main--index">
                <Navigation />

                <div className="cities">
                    <div className="cities__places-container container">
                        <section className="cities__places places">
                            <Filter />
                            
                            <CardList offers={offers} />
                        </section>
                    </div>
                </div>
            </main> 
        </div>
    );
}

export default MainPage;
