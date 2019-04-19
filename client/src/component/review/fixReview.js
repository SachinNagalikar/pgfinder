import React from 'react'
import StarRatings from 'react-star-ratings'
export default class FixRating extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: props.average,

        }
    }

    componentWillReceiveProps(next) {
        const rating = next.average
        this.setState(
            { rating }
        )
    }

    render() {
        // aggregateRating = 2.35;
        return (
            <StarRatings
                rating={this.state.rating}
                starRatedColor='orange'
                starDimension="40px"
                starSpacing="15px"
            />
        );
    }
}
