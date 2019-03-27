import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import {Button,Form,Input,FormGroup,Label} from 'reactstrap'
class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            email: '',  
            password: '',
            redirectList:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
        //this.passwordChange = this.passwordChange.bind(this)
    
    }
    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name]:e.target.value
    }))
    }
    
    emailChange (e) {
        const email = e.target.value
        this.setState(()=>({email}))
    }
    passwordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    handleSubmit=(e)=> {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password:this.state.password
        }
        console.log(formData)
        this.setState(() => ({
            email: '',
            password:''
        }))
        axios.post('/users/login', formData)
            .then((response) => {
               
                const {token
            } = response.data
                
                localStorage.setItem('token', token)
                this.props.history.push('/')
                
            })
            .catch((err) => {
            console.log(err)
        })
}
    render() { 
        if (this.state.redirectList) {
            return <Redirect to='/' />
        }
        return (
            <div>
            <div className="container" striped>
            <div className="row">
            <div className="col-md-4" bordered></div>
                <Form onSubmit={this.handleSubmit}>
                <h2>login</h2>
                <Label>
                    Email <br/>
                    <Input type="email" name="email" value={this.state.email} onChange={this.emailChange}/>
                </Label><br/>
                <Label>
                    Password<br/>
                    <Input type="password" value={this.state.password} onChange={this.passwordChange} /><br/>
                    </Label><br/>
                    <Button color="primary" type="submit" value="submit">submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
} 
export default Login