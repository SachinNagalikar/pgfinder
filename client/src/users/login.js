import React from 'react'
import axios from '../component/config/axios'
import { connect } from 'react-redux'
import { setUser } from '../component/redux/actions/user'
import { Button, Form, Label, Input, FormText, FormGroup,Col,Row } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import '../../src/App.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirectList: false,
            emailError: '',
            passwordError: '',
            hidden: true
        }
    }

    emailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    passwordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    validate = () => {
        let isError = false;
        const errors = {

            emailError: '',
            passwordError: '',
        }

        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email"
        }

        if (this.state.password.length < 5) {
            isError = true;
            errors.passwordError = "Requires password";
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const err = this.validate()
        if (!err) {
            const formData = {
                email: this.state.email,
                password: this.state.password,

            }
            axios.post('/users/login', formData)
                .then((response) => {
                    const { token } = response.data
                    localStorage.setItem('token', token)
                    this.props.dispatch(setUser(token))
                    this.setState(() => ({
                        email: '',
                        password: '',
                        redirectList: true
                    }))
                })
                .catch((err) => {
                    console.log(err.response.data)
                })
        }
    }


    render() {
        if (this.state.redirectList) {
            return <Redirect to="/pg" />
        }
        return (
            <div>
            <div className="container">
                <Row>
                    <Col sm={{ size: 10, order: 2, offset: 3 }}>
                <div className="form-wrapper" >
                    <Form onSubmit={this.handleSubmit}>
                        <h2 style={{ textAlign: 'center' }}>login</h2>
                        <Col sm={{ size: 10, order: 2, offset: 3 }}> <FormGroup>
                            <Label>
                                <Label>Email</Label>
                                <Input type="email" name="email" value={this.state.email} onChange={this.emailChange} placeholder="Email" />
                                <FormText color="danger">{this.state.emailError}</FormText>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Label>Password</Label>
                                <Input type={this.state.hidden ? "password" : "text"} value={this.state.password} onChange={this.passwordChange} placeholder="Password" />
                                <FormText color="danger">{this.state.passwordError}</FormText>
                                <Button onClick={this.toggleShow}>Show/Hide</Button>
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">submit</Button></Col>
                    </Form>
                        </div >
                    </Col>
                    </Row>
                </div>
                </div>
        )
    }
}

export default connect()(Login)