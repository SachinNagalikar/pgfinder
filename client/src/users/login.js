import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button, Form, Label, Input,Navbar} from 'reactstrap'
import '../../src/App.css'

class Login extends React.Component{
constructor(props) {
super(props)
    this.state = {
         email: '',
        password: '',
        emailError: '',
        passwordError:'',
        redirectList:false
                }
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
        const error = this.validate()
        if (!error) {
            const formData = {
                email: this.state.email,
                password: this.state.password,
           
            }
            console.log(formData)
            
           axios.post('/users/login', formData)

                .then((response) => {
                    const token = response.data
                    this.props.history.push('/users/home')
                    if (token) {
                        this.setState(() => ({ redirectList: true }))
                        
                    }
                   
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        this.setState(() => ({
            password: '',
            email: ''
        }))
        
    }
    validate = () => {
        let isError = false
        const errors = {
            emailError: '',
            passwordError:''
        }
       
        if (this.state.email.indexOf("@") === -1) {
            isError = true
            errors.emailError = "Require valid email id"
        }
        if (this.state.password.length === 0) {
       
            isError = true
            errors.passwordError = " enter password"
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }
    
    render() {
        if (this.state.redirectList) {
            return <Redirect to='/pg'/>
        }  
        console.log(this.props)
        return (
            <div>
                  <div className="container" >
                <Navbar color="light"  expand="md">
                    <div className="row">
                        <div className="col-md-5" ></div>
                <Form onSubmit={this.handleSubmit}>
                <h2>login</h2>
                <Label>
                    Email<br />
                  <Input type="email" name="email" value={this.state.email} onChange={this.emailChange} placeholder="Email" />
                 <span style={{ color: 'red' }}>{this.state.emailError}</span>
                                </Label>
                <br/>
                <Label>
                    Password<br />
                  <Input type="password" value={this.state.password} onChange={this.passwordChange} placeholder="Password" /> 
                    <span style={{ color: 'red' }}>{this.state.passwordError}</span> 
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
