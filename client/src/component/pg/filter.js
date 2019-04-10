import React from 'react'
import {Button,Card} from 'reactstrap'
class FilterPg extends React.Component {
    constructor() {
        super()
        this.state = this.resetFilter();
    }

    pgTypeChange = (e) => {
        e.persist();
        let state = { ...this.state };
        state.pgTypes.Girls = false;
        state.pgTypes.Boys = false;
        state.pgTypes[e.target.id] = e.target.checked;

        this.setState(() => (state), () => { this.props.onFilterChange(this.state); })
    }

    roomTypeChange = (e) => {
        e.persist();
        let state = { ...this.state };
        state.roomTypes[e.target.id].value = e.target.checked;
        this.setState(() => (state), () => { this.props.onFilterChange(this.state); });
    }

    resetFilter() {
        return {
            pgTypes: {
                Boys: false,
                Girls: false
            },
            roomTypes: {
                singleSharing: {
                    name: 'One And Sharing',
                    value: false
                },
                twoSharing: {
                    name: 'Two And Sharing',
                    value: false
                },
                threeSharing: {
                    name: 'Three And Sharing',
                    value: false
                },
                fourSharing: {
                    name: 'Four And Sharing',
                    value: false
                }
            }
        };
    }

    reset(e) {
        e.preventDefault()
        this.setState(this.resetFilter(), () => { this.props.reset(this.state) })
    }

    render() {
        return (
               
            <div className="form">
                <form>
             
                    <label>
                        <h5>PG Type</h5>
                    </label><br />
                    <label>
                        <input type="radio" id="Boys" checked={this.state.pgTypes.Boys} name="pgTypes" onChange={this.pgTypeChange.bind(this)} /> Boys
                    </label>
                    <label>
                        <input type="radio" id="Girls" checked={this.state.pgTypes.Girls} name="pgTypes" onChange={this.pgTypeChange.bind(this)} /> Girls
                    </label><br />
                    <label>
                        <h5>Room Type</h5>
                    </label><br/>
                    <label>
                        <input type="checkbox" id="singleSharing" checked={this.state.roomTypes.singleSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} /> One And Sharing
                    </label><br/>
                    <label>
                        <input type="checkbox" id="twoSharing" checked={this.state.roomTypes.twoSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} /> Two And Sharing
                    </label><br />
                    <label>
                        <input type="checkbox" id="threeSharing" checked={this.state.roomTypes.threeSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} /> Three And Sharing
                    </label><br/>
                    <label>
                        <input type="checkbox" id="fourSharing" checked={this.state.roomTypes.fourSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} /> Four And Sharing
                    </label><br/>
                        <Button type="button" onClick={this.reset.bind(this)}>Reset</Button>
                       
                </form>
                </div>
              
        )
    }
}

export default FilterPg