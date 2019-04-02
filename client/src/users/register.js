
import React from 'react'
import { Button, Form, FormGroup,FormText, Label, Input,Navbar } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../src/App.css'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: props.firstname ? props.firstname : '',
            middlename: props.middlename ? props.middlename : '',
            lastname: props.lastname ? props.lastname : '',
            email: props.email ? props.email : '',
            mobile: props.mobile ? props.mobile : '',
            password: props.password ? props.password : '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            mobileError: '',
            redirectList: false
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //to be es6 arrow function based
    handleFirst = (e) => {
        const firstname = e.target.value
        this.setState(() => ({ firstname }))
    }
    handleMiddle = (e) => {
        const middlename = e.target.value
        this.setState(() => ({ middlename }))
    }
    handleLast = (e) => {
        const lastname = e.target.value
        this.setState(() => ({ lastname }))
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
        console.log(errors, "errors")
        if (this.state.firstname.length < 3) {

            isError = true
            errors.firstNameError = "firstname at least 3 character"
        } if (this.state.lastname.length === 0) {
            isError = true
            errors.lastNameError = "lastname not be empty"
        }
        if (this.state.middlename.length === 0) {
            isError = true
            errors.middleNameError = "middlename not be empty"
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
        const formData = {
            firstname: this.state.firstname,
            middlename: this.state.middlename,
            lastname: this.state.lastname,
            password: this.state.password,
            email: this.state.email,
            mobile: this.state.mobile
        }
        console.log(formData)
        axios.post('/users/login', formData)
            .then((response) => {
                const { token
                } = response.data

                localStorage.setItem('token', token)
                this.props.history.push('/users/login')

            })
            .catch((err) => {
                console.log(err)
            })
        this.setState(() => ({
            firstname: '',
            middlename: '',
            lastname: '',
            password: '',
            email: '',
            mobile: ''
        }))

    }

    render() {
        if (this.state.redirectList) {
            return <Redirect to='/users/login' />
        }
        return (
            <div >
                <div className="container" >
                <Navbar color="light" light expand="md">

                    <div className="row">
                        <div className="col-md-2" ></div>
                        <Form onSubmit={this.handleSubmit}>
                            <h2>Register</h2>
                            <Label>
                                First Name<br />
                                <Input type="text" value={this.state.firstname} onChange={this.handleFirst} placeholder="Firstname" />
                                <FormText color="danger" >{this.state.firstNameError}</FormText>
                            </Label>
                            <Label>
                                Middle Name<br />
                                <Input type="text" value={this.state.middlename} onChange={this.handleMiddle}
                                    placeholder="Middlename" />
                                <FormText color="danger" >{this.state.middleNameError} </FormText>
                            </Label>
                            <Label>
                                Last Name<br />
                                <Input type="text" value={this.state.lastname} onChange={this.handleLast} placeholder="Lastname" />
                 <FormText color="danger">{this.state.lastNameError} </FormText>  
                    </Label><br/>
                    <FormGroup >
                    <Label>
                     Email
                  </Label>
                  <Input type="email" value={this.state.email} onChange={this.handleEmail}
                                    placeholder="Email" />
                                <FormText color="danger" >{this.state.emailError} </FormText>
                            </FormGroup>
                            <FormGroup >
                                <Label>
                                    Password<br />
                                    <Input type="password" value={this.state.password} onChange={this.handlePassword}
                                        placeholder="Password" />
                                </Label><br />
                                <FormText color="danger" >{this.state.passwordError}</FormText>
                            </FormGroup>
                            <FormGroup >
                                <Label>
                                    Mobile<br />
                                    <Input type="text" value={this.state.mobile} onChange={this.handleMobile} placeholder="Mobile" />
                                </Label><br />
                                <FormText color="danger" >{this.state.mobileError}</FormText>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">submit</Button>
                        </Form>
                        </div>
                        </Navbar>
                </div>

            </div>
        )
    }
}
export default Register
