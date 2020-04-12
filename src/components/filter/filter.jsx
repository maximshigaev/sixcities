import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {sortBy} from '../../actions/helpers.js';
import {hotelsByCity} from '../../selectors.js';

class Filter extends React.PureComponent {
    state = {
        isOpened: false
    }

    static propTypes = {
        sortOptionClickHandler: PropTypes.func.isRequired,
        currentSorting: PropTypes.string.isRequired,
        activeCity: PropTypes.string,
        offers: PropTypes.arrayOf(PropTypes.object),
    }

    sortSpanClickHandler = () => {
        this.setState(({isOpened}) => {
            return {
                isOpened: !isOpened
            }
        });
    }

    render() {
        const {sortOptionClickHandler, currentSorting, activeCity, offers} = this.props;
        const optionsTitles = [
            {
                title: `Popular`,
                id: 1
            },
            {
                title: `Price: low to high`,
                id: 2
            },
            {
                title: `Price: high to low`,
                id: 3
            },
            {
                title: `Top rated first`,
                id: 4
            }
        ];
        const optionsList = 
            <ul className="places__options places__options--custom places__options--opened">
                {
                    optionsTitles.map(({title, id}) => {
                        const className = (title === currentSorting)
                            ? `places__option places__option--active`
                            : `places__option`;

                        return (
                            <li key={id} className={className} tabIndex="0"
                                onClick={() => sortOptionClickHandler(title)}
                            >
                                {title}
                            </li>
                        );
                    })
                }
            </ul>;

        return (
            <React.Fragment>
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex="0" onClick={this.sortSpanClickHandler}>
                        Popular
                        <svg className="places__sorting-arrow" width="7" height="4">
                            <use xlinkHref="#icon-arrow-select"></use>
                        </svg>
                    </span>
                    {(this.state.isOpened) ? optionsList : null}
                </form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentSorting: state.currentSorting,
        activeCity: state.activeCity,
        offers: hotelsByCity(state),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sortOptionClickHandler: bindActionCreators(sortBy, dispatch)
    }
}

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
