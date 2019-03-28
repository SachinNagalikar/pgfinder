import React from 'react'
import axios from '../../src/component/config/axios';
import { Button, Form, Label, Input} from 'reactstrap'
import { Redirect } from 'react-router-dom'

class Login extends React.Component{
constructor() {
super()
    this.state = {
         email: '',
        password: '',
        redirectList:false
                }
    }
    handleChange=(e)=> {
        e.persist()
        this.setState(() => ({
        [e.target.name]:e.target.value
            }))
                    }

    emailChange=(e)=> {
        const email = e.target.value
        this.setState(()=>({email}))
    }
    passwordChange = (e) => {
        const password = e.target.value
        this.setState(()=>({password}))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password:this.state.password
        }
        console.log(formData)
        axios.post('/users/login', formData)

            .then((response) => {
                const { token } = response.data
                localStorage.setItem('token', token)
                if(token){
                this.setState(()=>({redirectList:true}))
                }
                })
            .catch((err) => {
            console.log(err)
            })
        
    }

    render() {
        if (this.state.redirectList) {
            return <Redirect to='/category'/>
        }  
        return (
            <div>
                 <div className="container" >
            <div className="row">
            <div className="col-md-5"></div>
                <Form onSubmit={this.handleSubmit}>
                <h2>login</h2>
                <Label>
                    email<br />
                    <Input type="email" name="email" value={this.state.email} onChange={this.emailChange} /><br />
                </Label><br/>
                <Label>
                    password<br />
                    <Input type="password" value={this.state.password} onChange={this.passwordChange} /><br />     
                </Label><br/>
                <Button type="submit" onChange={this.handleSubmit} color="primary">submit</Button>
                </Form>
                    </div>
                    </div></div>
        )
    }
}
export default Login
