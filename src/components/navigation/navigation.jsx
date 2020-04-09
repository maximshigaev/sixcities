import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {activeCityChange} from '../../actions.js';
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
                                const className = (item === activeCity)
                                    ? `locations__item-link tabs__item tabs__item--active`
                                    : `locations__item-link tabs__item`;

                                return (
                                    <li key={item} className="locations__item">
                                        <a className={className} href="#" id={item}
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

const mapStateToProps = (state) => {
    return {
        activeCity: state.activeCity,
        citiesNames: citiesNames(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navItemClickHandler: bindActionCreators(activeCityChange, dispatch)
    }
}

export {Navigation};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
