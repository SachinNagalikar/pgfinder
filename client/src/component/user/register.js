import React from 'react'
import axios from '../config/axios'
import { Redirect } from 'react-router-dom'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            noticeMsg: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            mobileError: '',
            passwordError: '',
            redirectList: false
        }
    }

    firstNameChange = (e) => {
        const firstName = e.target.value
        this.setState(() => ({ firstName }))
    }

    middleNameChange = (e) => {
        const middleName = e.target.value
        this.setState(() => ({ middleName }))
    }

    lastNameChange = (e) => {
        const lastName = e.target.value
        this.setState(() => ({ lastName }))
    }

    mobileChange = (e) => {
        const mobile = e.target.value
        this.setState(() => ({ mobile }))
    }


    emailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    passwordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    validate = () => {
        let isError = false
        const errors = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            mobileError: '',
            passwordError: ''
        }
        if (this.state.firstName.length < 5) {
            isError = true
            errors.firstNameError = "firstname at least 4 character"
        } if (this.state.lastName.length === 0) {
            isError = true
            errors.lastNameError = "lastname is empty"
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

    handleSubmit = (e) => {
        e.preventDefault()
        const error = this.validate()
        if (!error) {
            const formData = {
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                mobile: this.state.mobile,
                email: this.state.email,
                password: this.state.password
            }
            alert("from submitted")

            //client side validation
            axios.post('/users/register', formData)
                .then((response) => {
                    this.setState(() => ({
                        noticeMsg: response.data.notice,
                        username: '',
                        email: '',
                        password: '',
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
            return <Redirect to="/users/login" />
        }
        return (
            <div>
                <h2>Register form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        FirstName <br />
                        <input type='text' value={this.state.firstName} onChange={this.firstNameChange} />
                    </label><br />
                    <p>{this.state.firstNameError}</p>
                    <label>
                        MiddleName<br />
                        <input type="text" value={this.state.middleName} onChange={this.middleNameChange} />
                    </label><br />
                    <label>
                        LastName<br />
                        <input type="text" value={this.state.lastName} onChange={this.lastNameChange} />
                    </label><br />
                    <p>{this.state.lastNameError}</p>
                    <label>
                        Mobile<br />
                        <input type="text" value={this.state.mobile} onChange={this.mobileChange} />
                    </label><br />
                    <p>{this.state.mobileError}</p>
                    <label>
                        Email <br />
                        <input type='email' value={this.state.email} onChange={this.emailChange} />
                    </label><br />
                    <p>{this.state.emailError}</p>
                    <label>
                        Password <br />
                        <input type='password' value={this.state.password} onChange={this.passwordChange} />
                    </label><br />
                    <p>{this.state.passwordError}</p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default Register