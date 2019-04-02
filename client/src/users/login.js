import React from 'react'
import axios from '../component/config/axios'
import { Button, Form, Label, Input, Navbar } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import '../../src/App.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirectList: false
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
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password,

        }
        axios.post('/users/login', formData)
            .then((response) => {
                console.log(response.data)
                const { token } = response.data
                console.log(token)
                localStorage.setItem('token', token)
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

    render() {
        if (this.state.redirectList) {
            return <Redirect to="/pg" />
        }
        return (
            <div>
                <div className="container" >
                    <Navbar color="light" expand="md">
                        <div className="row">
                            <div className="col-md-5" ></div>
                            <Form onSubmit={this.handleSubmit}>
                                <h2>login</h2>
                                <Label>
                                    Email<br />
                                    <Input type="email" name="email" value={this.state.email} onChange={this.emailChange} placeholder="Email" />
                                </Label>
                                <br />
                                <Label>
                                    Password<br />
                                    <Input type="password" value={this.state.password} onChange={this.passwordChange} placeholder="Password" />
                                </Label>
                                <br />
                                <Button type="submit" value="submit" color="primary">submit</Button>
                            </Form>
                        </div>
                    </Navbar>
                </div>
            </div>
        )
    }
}
export default Login
