import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import cn from 'classnames';

import {activeCityChange} from '../../actions/helpers.js';
import {citiesNames} from '../../selectors.js';

const Navigation = ({activeCity, navItemClickHandler, citiesNames}) => {
    return (
        <React.Fragment>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
                <section className="locations container">
                    <ul className="locations__list tabs__list">
                        {
                            citiesNames.map((item) => {
                                const className = cn(`locations__item-link tabs__item`,
                                    {'tabs__item--active': item === activeCity});

                                return (
                                    <li key={item} className="locations__item">
                                        <a className={className} href="#" id={item}
                                            title={(item === activeCity) ? `` : `To the offers of ${item}`}
                                            onClick={() => navItemClickHandler(item)}
                                        >
                                            <span>{item}</span>
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </section>
            </div>
        </React.Fragment>
    )
}

Navigation.propTypes = {
    activeCity: PropTypes.string,
    navItemClickHandler: PropTypes.func.isRequired,
    citiesNames: PropTypes.arrayOf(PropTypes.string)
}

const mapStateToProps = ({offers}) => {
    return {
        activeCity: offers.activeCity,
        citiesNames: citiesNames(offers)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navItemClickHandler: bindActionCreators(activeCityChange, dispatch)
    }
}

export {Navigation};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
