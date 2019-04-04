import React from 'react'

class FilterPg extends React.Component {
    constructor() {
        super()
        this.state = {
            pg: {}
        }
    }

    pgTypeChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    roomTypeChange = (e) => {
        e.persist()
        var nameType = e.target.name
        var value = e.target.value
        var checked = e.target.checked
        if (checked) {
            this.setState((prevState) => ({
                nameType: prevState.roomTypes.push(value)
            }))
        } else {
            this.setState((prevState) => ({
                nameType: prevState.roomTypes.splice(prevState.roomTypes.indexOf(value), 1)
            }))
        }
    }

    // submitHandle = (e) => {
    //     e.preventdefault()
    //     const formData = {
    //         pgTypes: this.state.pgTypes,
    //         roomTypes: this.state.roomTypes
    //     }
    // }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandle}>
                    <label>
                        <h5>PG Type</h5><br />
                    </label>
                    <label>
                        <input type="radio" value="Boys" name="pgTypes" onChange={this.pgTypeChange} /> Boys
                    </label>
                    <label>
                        <input type="radio" value="Girls" name="pgTypes" onChange={this.pgTypeChange} /> Girls
                    </label><br />
                    <label>
                        <h5>Room Type</h5><br />
                    </label>
                    <label>
                        <input type="checkbox" Value="One And Sharing" name="roomTypes" onChange={this.roomTypeChange} /> One And Sharing
                    </label>
                    <label>
                        <input type="checkbox" value="Two And Sharing" name="roomTypes" onChange={this.roomTypeChange} /> Two And Sharing
                    </label><br />
                    <label>
                        <input type="checkbox" value="Three And Sharing" name="roomTypes" onChange={this.roomTypeChange} /> Three And Sharing
                    </label>
                    <label>
                        <input type="checkbox" value="four And Sharing" name="roomTypes" onChange={this.roomTypeChange} /> Four And Sharing
                    </label>
                </form>
            </div>
        )
    }
}

export default FilterPg