import React from 'react'

class PgForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pgName: props.pgName ? props.pgName : '',
            roomTypes: props.roomTypes ? props.roomTypes : [],
            pgTypes: props.pgTypes ? props.pgTypes : '',
            foods: props.foods ? props.foods : '',
            amenities: props.amenities ? props.amenities : [],
            address: props.address ? props.address : '',
            description: props.description ? props.description : '',
            rules: props.rules ? props.rules : '',
            pgRent: props.pgRent ? props.pgRent : '',
            deposit: props.deposit ? props.deposit : '',
            image: ''
        }
    }

    pgNameChange = (e) => {
        const pgName = e.target.value
        this.setState(() => ({ pgName }))
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

    pgTypeChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    foodChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    amenitiesChange = (e) => {
        e.persist()
        var checked = e.target.checked
        var nameType = e.target.name
        var value = e.target.value
        if (checked) {
            this.setState((prevState) => ({
                nameType: prevState.amenities.push(value)
            }))
        } else {
            this.setState((prevState) => ({
                nameType: prevState.amenities.splice(prevState.amenities.indexOf(value), 1)
            }))
        }

    }

    addressChange = (e) => {
        const address = e.target.value
        this.setState(() => ({ address }))
    }

    descriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }

    rulesChange = (e) => {
        const rules = e.target.value
        this.setState(() => ({ rules }))
    }

    rentChange = (e) => {
        const pgRent = e.target.value
        this.setState(() => ({ pgRent }))
    }

    depositChange = (e) => {
        const deposit = e.target.value
        this.setState(() => ({ deposit }))
    }

    submitHandle = (e) => {
        e.preventDefault()
        const formData = {
            pgName: this.state.pgName,
            roomTypes: this.state.roomTypes,
            pgTypes: this.state.pgTypes,
            foods: this.state.foods,
            amenities: this.state.amenities,
            address: this.state.address,
            description: this.state.description,
            rules: this.state.rules,
            pgRent: this.state.pgRent,
            deposit: this.state.deposit,
            image: this.state.image
        }
        this.props.pgSubmitHandle(formData)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandle}>
                    <label>
                        PG Name:<br />
                        <input type="text" value={this.state.pgName} onChange={this.pgNameChange} />
                    </label><br />
                    <label>
                        Room Type:<br />
                    </label>
                    <label>
                        <input type="checkbox" value="One And Sharing" checked={this.state.roomTypes.includes('One And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> One And Sharing
                        </label>
                    <label>
                        <input type="checkbox" value="Two And Sharing" checked={this.state.roomTypes.includes('Two And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Two And Sharing
                        </label>
                    <label>
                        <input type="checkbox" value="Three And Sharing" checked={this.state.roomTypes.includes('Three And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Three And Sharing
                        </label>
                    <label>
                        <input type="checkbox" value="Four And Sharing" checked={this.state.roomTypes.includes('Four And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Four And Sharing
                        </label><br />
                    <label>
                        PG Type:
                    </label>
                    <label>
                        <input type="radio" value="Boys" checked={this.state.pgTypes.includes('Boys')} onChange={this.pgTypeChange} name="pgTypes" /> Boys
                        </label>
                    <label>
                        <input type="radio" value="Girls" checked={this.state.pgTypes.includes('Girls')} onChange={this.pgTypeChange} name="pgTypes" />  Girls
                        </label><br />
                    <label>
                        Food:
                        </label>
                    <label>
                        <input type="radio" value="Veg" checked={this.state.foods.includes('Veg')} onChange={this.foodChange} name="foods" />  Veg
                        </label>
                    <label>
                        <input type="radio" value="Non-veg" checked={this.state.foods.includes('Non-veg')} onChange={this.foodChange} name="foods" /> Non-Veg
                        </label><br />
                    <label>
                        Amenities:<br />
                    </label>
                    <label>
                        <input type="checkbox" value="Wifi" checked={this.state.amenities.includes('Wifi')} onChange={this.amenitiesChange} name="amenities" /> Wifi
                    </label>
                    <label>
                        <input type="checkbox" value="Laundery" checked={this.state.amenities.includes('Laundery')} onChange={this.amenitiesChange} name="amenities" /> Laundery
                    </label>
                    <label>
                        <input type="checkbox" value="Mess" checked={this.state.amenities.includes('Mess')} onChange={this.amenitiesChange} name="amenities" /> Mess
                    </label>
                    <label>
                        <input type="checkbox" value="T.V" checked={this.state.amenities.includes('T.V')} onChange={this.amenitiesChange} name="amenities" /> T.V
                    </label>
                    <label>
                        <input type="checkbox" value="Refrigerator" checked={this.state.amenities.includes('Refrigerator')} onChange={this.amenitiesChange} name="amenities" /> Refrigerator
                    </label>
                    <label>
                        <input type="checkbox" value="Lift" checked={this.state.amenities.includes('Lift')} onChange={this.amenitiesChange} name="amenities" /> Lift
                    </label>
                    <label>
                        <input type="checkbox" value="Room Cleaning" checked={this.state.amenities.includes('Room Cleaning')} onChange={this.amenitiesChange} name="amenities" /> Room Cleaning
                    </label><br />
                    <label>
                        Address:<br />
                        <input type="text" value={this.state.address} onChange={this.addressChange} />
                    </label><br />
                    <label>
                        Description:<br />
                        <input type="text" value={this.state.description} onChange={this.descriptionChange} />
                    </label><br />
                    <label>
                        PG Rules:<br />
                        <input type="text" value={this.state.rules} onChange={this.rulesChange} />
                    </label><br />
                    <label>
                        Rent:<br />
                        <input type="number" value={this.state.pgRent} onChange={this.rentChange} />
                    </label><br />
                    <label>
                        Deposit:<br />
                        <input type="number" value={this.state.deposit} onChange={this.depositChange} />
                    </label><br />
                    <img />
                    <input type="submit" value="submit" />
                </form>
            </div >
        )
    }
}

export default PgForm