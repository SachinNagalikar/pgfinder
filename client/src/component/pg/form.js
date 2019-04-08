import React from 'react'
import { Form, Label, Input } from 'reactstrap'

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
             filename: props.filename ? props.filename : null
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
        //console.log(value)
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

    ImageChange = (e) => {
        const filename = e.target.files
        this.setState(() => ({ filename }))
    }

    pgSubmitHandle = (e) => {

        e.preventDefault()
        const data = new FormData()
        data.append("pgName", this.state.pgName)
        data.append("roomTypes", this.state.roomTypes)
        data.append("pgTypes", this.state.pgTypes)
        data.append("foods", this.state.foods)
        data.append("amenities", this.state.amenities)
        data.append("address", this.state.address)
        data.append("description", this.state.description)
        data.append("rules", this.state.rules)
        data.append("pgRent", this.state.pgRent)
        data.append("deposit", this.state.deposit)
        for (let file of this.state.filename) {
            data.append("image", file)
        }
        // const formData = {
        //     pgName: this.state.pgName,
        //     roomTypes: this.state.roomTypes,
        //     pgTypes: this.state.pgTypes,
        //     foods: this.state.foods,
        //     amenities: this.state.amenities,
        //     address: this.state.address,
        //     description: this.state.description,
        //     rules: this.state.rules,
        //     pgRent: this.state.pgRent,
        //     deposit: this.state.deposit
        // }
        this.props.pgSubmitHandle(data)
    }
    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper" >
                    <Form onSubmit={this.pgSubmitHandle}>
                        <Label>
                            PG Name<br />
                            <Input type="text" value={this.state.pgName} onChange={this.pgNameChange} placeholder="PG Name" />
                        </Label><br />
                        <Label>
                            Address<br />
                            <Input type="textarea" value={this.state.address} onChange={this.addressChange}
                                placeholder="Address" />
                        </Label><br />
                        <Label>
                            Description<br />
                            <Input type="textarea" value={this.state.description} onChange={this.descriptionChange} placeholder="Description" />
                        </Label><br />
                        <Label>
                            PG Rules:<br />
                            <Input type="textarea" value={this.state.rules} onChange={this.rulesChange} placeholder="PG Rules" />
                        </Label><br />
                        <Label>
                            Rent:<br />
                            <Input type="number" value={this.state.pgRent} onChange={this.rentChange}
                                placeholder="Rent" />
                        </Label><br />
                        <Label>
                            Deposit:<br />
                            <Input type="number" value={this.state.deposit} onChange={this.depositChange}
                                placeholder="Deposit" />
                        </Label><br />

                        <Label>
                            <h5> PG Type</h5>
                        </Label><br />
                        <Label>
                            <input type="radio" value="Boys" checked={this.state.pgTypes.includes('Boys')} onChange={this.pgTypeChange} name="pgTypes" /> Boys
                        </Label>
                        <Label>
                            <input type="radio" value="Girls" checked={this.state.pgTypes.includes('Girls')} onChange={this.pgTypeChange} name="pgTypes" />  Girls
                        </Label><br />
                        <Label>
                            <h5>Food</h5>
                        </Label><br />
                        <Label>
                            <input type="radio" value="Veg" checked={this.state.foods.includes('Veg')} onChange={this.foodChange} name="foods" />  Veg
                        </Label>
                        <Label>
                            <input type="radio" value="Non-veg" checked={this.state.foods.includes('Non-veg')} onChange={this.foodChange} name="foods" /> Non-Veg
                        </Label><br />
                        <Label>
                            <h5>Room Type</h5>
                        </Label><br />
                        <Label>
                            <Input type="checkbox" value="One And Sharing" checked={this.state.roomTypes.includes('One And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> One And Sharing
                    </Label><br />
                        <Label>
                            <Input type="checkbox" value="Two And Sharing" checked={this.state.roomTypes.includes('Two And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Two And Sharing
                        </Label><br />
                        <Label>
                            <Input type="checkbox" value="Three And Sharing" checked={this.state.roomTypes.includes('Three And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Three And Sharing
                        </Label><br />
                        <Label>
                            <Input type="checkbox" value="Four And Sharing" checked={this.state.roomTypes.includes('Four And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Four And Sharing
                        </Label><br />

                        <Label>
                            <h5>Amenities</h5>
                        </Label><br />
                        <Label>
                            <Input type="checkbox" value="Wifi" checked={this.state.amenities.includes('Wifi')} onChange={this.amenitiesChange} name="amenities" /> Wifi
                    </Label><br />
                        <Label>
                            <Input type="checkbox" value="Laundery" checked={this.state.amenities.includes('Laundery')} onChange={this.amenitiesChange} name="amenities" /> Laundery
                    </Label><br />
                        <Label>
                            <Input type="checkbox" value="Mess" checked={this.state.amenities.includes('Mess')} onChange={this.amenitiesChange} name="amenities" /> Mess
                    </Label><br />
                        <Label>
                            <Input type="checkbox" value="T.V" checked={this.state.amenities.includes('T.V')} onChange={this.amenitiesChange} name="amenities" /> T.V
                    </Label><br />
                        <Label>
                            <Input type="checkbox" value="Refrigerator" checked={this.state.amenities.includes('Refrigerator')} onChange={this.amenitiesChange} name="amenities" /> Refrigerator
                    </Label><br />
                        <Label>
                            <Input type="checkbox" value="Lift" checked={this.state.amenities.includes('Lift')} onChange={this.amenitiesChange} name="amenities" /> Lift
                    </Label><br />
                        <Label>
                            <Input type="checkbox" value="Room Cleaning" checked={this.state.amenities.includes('Room Cleaning')} onChange={this.amenitiesChange} name="amenities" /> Room Cleaning
                    </Label><br />
                        <Label>
                                    Image:<br />
                                    <Input type="file" multiple name="image" onChange={this.ImageChange} />
                                </Label><br />
                        <Input type='submit' value='submit' />
                    </Form>
                </div >
            </div >
        )
    }
}


export default PgForm