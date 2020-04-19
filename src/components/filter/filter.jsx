import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {sortBy} from '../../actions/helpers.js';
import {hotelsByCity} from '../../selectors.js';

const Filter = ({currentSorting, activeCity, offersLength, sortBy}) => {
    const [isOpened, setIsOpened] = useState(false);

    const sortOptionClickHandler = (title) => {
        setIsOpened(false);
        sortBy(title);
    }

    const optionsTitles = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

    const optionsList = (
        <ul className="places__options places__options--custom places__options--opened">
            {
                optionsTitles.map((item) => {
                    const className = cn(`places__option`, {'places__option--active': item === currentSorting});

                    return (
                        <li key={item} className={className} tabIndex="0" onClick={() => sortOptionClickHandler(item)}>
                            {item}
                        </li>
                    );
                })
            }
        </ul>
    );

    return (
        <React.Fragment>
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersLength} places to stay in {activeCity}</b>
            <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span className="places__sorting-type" tabIndex="0" onClick={() => setIsOpened((isOpened) => !isOpened)}
                    title={(isOpened) ? `Close the menu` : `Open the menu`}
                >
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                </span>
                {(isOpened) ? optionsList : null}
            </form>
        </React.Fragment>
    );
}

Filter.propTypes = {
    sortBy: PropTypes.func.isRequired,
    currentSorting: PropTypes.string.isRequired,
    activeCity: PropTypes.string,
    offersLength: PropTypes.number.isRequired
}

const mapStateToProps = ({offers}) => {
    return {
        currentSorting: offers.currentSorting,
        activeCity: offers.activeCity,
        offersLength: hotelsByCity(offers).length
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sortBy: bindActionCreators(sortBy, dispatch)
    }
}

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
