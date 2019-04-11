import React from 'react'
import axios from '../config/axios'
import { Form, Input, FormGroup, Label, Container, Row, Col, Button } from 'reactstrap'

class AmenitiesForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    nameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))
    }

    amenitiesSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        axios.post('/amenities', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.setState(() => ({
                    name: ''
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2 >Add Amenites</h2>
                <Form onSubmit={this.amenitiesSubmit}>
                    <Container>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>
                                        <Label><h5>Amenities Name</h5></Label>
                                        <Input type="text" value={this.state.name} onChange={this.nameChange} />
                                    </Label>
                                </FormGroup>
                                <Button>submit</Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        )
    }
}

export default AmenitiesForm