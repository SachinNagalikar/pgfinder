import React from 'react'
import { Form, Label, Input, FormGroup, Button, Container, Row, Col } from 'reactstrap'
import axios from '../config/axios';
import Select from 'react-select'

class PgForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pgName: props.pgName ? props.pgName : '',
            roomTypes: props.roomTypes ? props.roomTypes : [],
            pgTypes: props.pgTypes ? props.pgTypes : '',
            foods: props.foods ? props.foods : '',
            amenities: props.amenities ? props.amenities : [],
            amenitie: false,
            address: props.address ? props.address : '',
            description: props.description ? props.description : '',
            rules: props.rules ? props.rules : '',
            pgRent: props.pgRent ? props.pgRent : '',
            deposit: props.deposit ? props.deposit : '',
            filename: props.filename ? props.filename : '',
            selectedOption: null
        }
    }

    componentDidMount() {
        axios.get('/amenities', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const amenities = response.data
                this.setState(() => ({ amenities, amenitie: true }))
            })
            .catch((err) => {
                console.log(err)
            })
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

    // amenitiesChange = (e) => {
    //     e.persist()
    //     var checked = e.target.checked
    //     var nameType = e.target.name
    //     var value = e.target.value
    //     //console.log(value)
    //     if (checked) {
    //         this.setState((prevState) => ({
    //             nameType: prevState.amenities.push(value)
    //         }))
    //     } else {
    //         this.setState((prevState) => ({
    //             nameType: prevState.amenities.splice(prevState.amenities.indexOf(value), 1)
    //         }))
    //     }
    // }
    amenitiesChange = (e) => {
        const amenities = e.target.value
        this.setState({ amenities })
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

    imageChange = (e) => {
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
        console.log(data)
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

        const { amenities } = this.state
        return (
            <div className="container">
                <div className="add" >
                    <Form onSubmit={this.pgSubmitHandle}>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label>
                                        <Label><h5>PG Name</h5></Label>
                                        <Input type="text" value={this.state.pgName} onChange={this.pgNameChange} placeholder="PG Name" />
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Label><h5>Address</h5></Label>
                                        <Input type="textarea" value={this.state.address} onChange={this.addressChange}
                                            placeholder="Address" />
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Label><h5>Description</h5></Label>
                                        <Input type="textarea" value={this.state.description} onChange={this.descriptionChange} placeholder="Description" />
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Label><h5>PG Rules</h5></Label>
                                        <Input type="textarea" value={this.state.rules} onChange={this.rulesChange} placeholder="PG Rules" />
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Label><h5>Rent</h5></Label>
                                        <Input type="number" value={this.state.pgRent} onChange={this.rentChange}
                                            placeholder="Rent" />
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Label><h5>Deposit</h5></Label>
                                        <Input type="number" value={this.state.deposit} onChange={this.depositChange}
                                            placeholder="Deposit" />
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label>
                                        <h5> PG Type</h5>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="radio" value="Boys" checked={this.state.pgTypes.includes('Boys')} onChange={this.pgTypeChange} name="pgTypes" /> Boys
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="radio" value="Girls" checked={this.state.pgTypes.includes('Girls')} onChange={this.pgTypeChange} name="pgTypes" />  Girls
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <h5>Food</h5>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="radio" value="Veg" checked={this.state.foods.includes('Veg')} onChange={this.foodChange} name="foods" />  Veg
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="radio" value="Non-veg" checked={this.state.foods.includes('Non-veg')} onChange={this.foodChange} name="foods" /> Non-Veg
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="radio" value="Both" checked={this.state.foods.includes('Both')} onChange={this.foodChange} name="foods" /> Both
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <h5>Room Type</h5>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="One And Sharing" checked={this.state.roomTypes.includes('One And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> One And Sharing
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Two And Sharing" checked={this.state.roomTypes.includes('Two And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Two And Sharing
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Three And Sharing" checked={this.state.roomTypes.includes('Three And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Three And Sharing
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Four And Sharing" checked={this.state.roomTypes.includes('Four And Sharing')} onChange={this.roomTypeChange} name="roomTypes" /> Four And Sharing
                                    </Label>
                                </FormGroup>
                                {/* <FormGroup>
                                    <Label>
                                        <h5>Amenities</h5>
                                        {this.state.amenitiesData.map(amenities => {
                                            return <><Input type="checkbox" key={amenities._id} value={amenities} onChange={this.amenitiesChange} name="amenities" />{amenities.name}<br /></>
                                        })}
                                    </Label>
                                </FormGroup> */}
                                {this.state.amenitie && (
                                    // <Select value={amenities} onChange={this.amenitiesChange}
                                    // option={
                                    //     this.state.amenities.map(amenitie => {

                                    //         console.log(amenitie.name[0])
                                    //         return (

                                    //             <option value="select">
                                    //                 select
                                    //                 </option>

                                    //         )
                                    //         // return (<option key={amenitie._id} value={amenitie._id}>{console.log("sac", amenitie.name)}</option>)
                                    //     })
                                    // }
                                    // />
                                    <select >
                                        <option value="select" >Select</option>
                                        {this.state.amenities.map(amenitie => {

                                            return <option value={amenitie.name}>{amenitie.name}</option>
                                        })}
                                    </select>
                                )}

                                {/* <FormGroup>
                                    <Label> */}

                                {/* <Input type="checkbox" value="Wifi" checked={this.state.amenities.includes('Wifi')} onChange={this.amenitiesChange} name="amenities" /> */}
                                {/* </Label>
                                </FormGroup> */}
                                {/* <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Laundery" checked={this.state.amenities.includes('Laundery')} onChange={this.amenitiesChange} name="amenities" /> Laundery
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Mess" checked={this.state.amenities.includes('Mess')} onChange={this.amenitiesChange} name="amenities" /> Mess
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="T.V" checked={this.state.amenities.includes('T.V')} onChange={this.amenitiesChange} name="amenities" /> T.V
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Refrigerator" checked={this.state.amenities.includes('Refrigerator')} onChange={this.amenitiesChange} name="amenities" /> Refrigerator
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Lift" checked={this.state.amenities.includes('Lift')} onChange={this.amenitiesChange} name="amenities" /> Lift
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <Input type="checkbox" value="Room Cleaning" checked={this.state.amenities.includes('Room Cleaning')} onChange={this.amenitiesChange} name="amenities" /> Room Cleaning
                                    </Label>
                                </FormGroup> */}
                                <FormGroup>
                                    {/* {this.props.filename && */}
                                    <Label>
                                        Image:<br />
                                        <Input type="file" multiple name="image" onChange={this.imageChange} />
                                    </Label>
                                    {/* } */}
                                </FormGroup>
                            </div>
                        </div>
                        <Container>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 4 }}>
                                    <Button>submit</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div >
            </div >
        )
    }
}

export default PgForm