import React from 'react';
import PropTypes from 'prop-types';


import Card from '../card/card.jsx';

class CardList extends React.PureComponent {
    state = {
        hoveredCard: null
    }

    static propTypes = {
        offers: PropTypes.arrayOf(PropTypes.object)
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
        const {offers} = this.props;

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

export default CardList;
