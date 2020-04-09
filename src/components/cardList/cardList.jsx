import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchOffers} from '../../actions.js';
import Card from '../card/card.jsx';
import Spinner from '../spinner/spinner.jsx';
import {hasOffers, hotelsByCity} from '../../selectors.js';

class CardList extends React.PureComponent {
    state = {
        hoveredCard: null
    }

    static propTypes = {
        offers: PropTypes.arrayOf(PropTypes.object),
        isLoading: PropTypes.bool.isRequired,
        hasOffers: PropTypes.bool.isRequired,
        fetchOffers: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.fetchOffers();
    }

    mouseEnterHandler = (id) => {
        this.setState({
            hoveredCard: id
        });
    }

    mouseLeaveHandler = () => {
        this.setState({
            hoveredCard: null
        });
    }

    render() {
        const {offers, isLoading, hasOffers} = this.props;

        if (isLoading) {
            return <Spinner />
        }

         if (!hasOffers) {
            return (
                <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the
                        moment in Dusseldorf
                    </p>
                </div>
            );
        }

        return (
            <div className="cities__places-list places__list tabs__content">
                {
                    offers.map((offer, ind) => {
                        return (
                            <Card key={offer.id} offer={offer} onMouseEnter={this.mouseEnterHandler}
                                onMouseLeave={this.mouseLeaveHandler} isHovered={ind === this.state.hoveredCard}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        offers: hotelsByCity(state),
        isLoading: state.isLoading,
        hasOffers: hasOffers(state)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffers: bindActionCreators(fetchOffers, dispatch)
    }
}

export {CardList};
export default connect(mapStateToProps, mapDispatchToProps)(CardList);
