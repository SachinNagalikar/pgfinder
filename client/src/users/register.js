import React from 'react'
import { Button, Form, FormGroup, FormText, Label, Input ,Col,Row} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import axios from '../component/config/axios'
import '../../src/App.css'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: props.firstName ? props.firstName : '',
            middleName: props.middleName ? props.middleName : '',
            lastName: props.lastName ? props.lastName : '',
            email: props.email ? props.email : '',
            mobile: props.mobile ? props.mobile : '',
            password: props.password ? props.password : '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            mobileError: '',
            hidden: true,
            redirectList: false
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //to be es6 arrow function based
    handleFirst = (e) => {
        const firstName = e.target.value
        this.setState(() => ({ firstName }))
    }
    handleMiddle = (e) => {
        const middleName = e.target.value
        this.setState(() => ({ middleName }))
    }
    handleLast = (e) => {
        const lastName = e.target.value
        this.setState(() => ({ lastName }))
    }
    handleEmail(e) {
        const email = e.target.value
        this.setState(() => ({ email }))
    }
    handlePassword = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }
    //bind in inline event handler
    handleMobile = (e) => {
        const mobile = e.target.value
        this.setState(() => ({ mobile }))
    }

    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    validate = () => {
        let isError = false
        const errors = {
            firstNameError: '',
            middleNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            mobileError: ''
        }
        if (this.state.firstName.length < 3) {
            isError = true
            errors.firstNameError = "firstName at least 3 character"
        } if (this.state.lastName.length === 0) {
            isError = true
            errors.lastNameError = "lastName not be empty"
        }
        if (this.state.middleName.length === 0) {
            isError = true
            errors.middleNameError = "middleName not be empty"
        }
        if (this.state.email.indexOf("@") === -1) {
            isError = true
            errors.emailError = "Require valid email id"
        }
        if (this.state.password.length === 0) {
            isError = true
            errors.passwordError = "password is empty"
        } if (this.state.mobile.length < 10) {
            isError = true
            errors.mobileError = "mobile number not be less than 10 digit"
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    handleSubmit(e) {
        e.preventDefault()
        const error = this.validate()
        if (!error) {
            const formData = {
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                mobile: this.state.mobile
            }
            console.log(formData)
            alert("form submitted")
            axios.post('/users/register', formData)
                .then((response) => {
                    console.log(response.data)
                    this.setState(() => ({
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        password: '',
                        email: '',
                        mobile: '',
                        redirectList: true
                    }))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        if (this.state.redirectList) {
            return <Redirect to='/users/login' />
        }
        return (
            <div className="container" >
                <Row>
                    <Col sm={{ size: 12, order: 2, offset: 3 }}>
                <div className="register">
                    <h2 style={{ textAlign: 'center' }}>Register</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Col sm={{ size: 12, order: 2, offset: 3 }}><FormGroup>
                            <Label>
                                <Label for="firstname">First Name</Label>
                                <Input type="text" value={this.state.firstName} onChange={this.handleFirst} placeholder="firstName" />
                                <FormText color="danger" >{this.state.firstNameError}</FormText>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Label>Middle Name</Label>
                                <Input type="text" value={this.state.middleName} onChange={this.handleMiddle}
                                    placeholder="middleName" />
                                <FormText color="danger" >{this.state.middleNameError} </FormText>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Label>Last Name</Label>
                                <Input type="text" value={this.state.lastName} onChange={this.handleLast} placeholder="lastName" />
                                <FormText color="danger">{this.state.lastNameError} </FormText>
                            </Label>
                        </FormGroup>
                        <FormGroup >
                            <Label>
                                <Label>Email</Label>
                                <Input type="email" value={this.state.email} name="email" id="email" onChange={this.handleEmail}
                                    placeholder="Email" />
                                <FormText color="danger" >{this.state.emailError} </FormText>
                            </Label>
                        </FormGroup>
                        <FormGroup >
                            <Label>
                                <Label>Mobile</Label>
                                <Input type="text" value={this.state.mobile} onChange={this.handleMobile} placeholder="Mobile" />
                                <FormText color="danger" >{this.state.mobileError}</FormText>
                            </Label>
                        </FormGroup>
                        <FormGroup >
                            <Label>
                                <Label>Password</Label>
                                <Input type={this.state.hidden ? "password" : "text"} value={this.state.password} onChange={this.handlePassword}
                                    placeholder="Password" />
                                <FormText color="danger" >{this.state.passwordError}</FormText>
                                <Button onClick={this.toggleShow}>Show/Hide</Button>
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">submit</Button></Col>
                    </Form>
                </div>
              
                    </Col>  
                    </Row>
                    </div>
        )
    }
}
export default Register
