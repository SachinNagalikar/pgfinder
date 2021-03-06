import React from 'react';
import '../../src/App.css'    
import PropTypes from 'prop-types';
import axios from '../component/config/axios'
import { connect } from 'react-redux'
import { setUser } from '../component/redux/actions/user'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility';   
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            hidden: true,
            loginError:"",
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
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

    

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
                    
                    if (response.data !== "invalid email or password") {
                        const { token } = response.data
                        localStorage.setItem('token', token)
                        
                    }
        
                    else {
                        this.setState(() => ({
                            loginError: response.data
                        }))
                    }
                    this.props.history.push('/pg/')
                })   
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    render() {
        console.log(this.props)
        // if (this.state.redirectList) {
        //     this.props.history.push('/pg')
        // }
        
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        SIGN IN
       </Typography>
                     <FormLabel color="danger" error={true}>{this.state.loginError}</FormLabel>
                    <form className={classes.form} >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.emailChange} autoFocus />
                            <span style={{color:"red"}}>{this.state.emailError}</span>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" id="password" autoComplete="current-password"
                                type={this.state.showPassword ? "text":"password" } value={this.state.password} onChange={this.passwordChange}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            } 
                                  
                         />
                            <span style={{color:"red"}}>{this.state.passwordError}</span>
                         
                        </FormControl>

                        <Button fullWidth variant="contained" color="primary" value="submit"
                            className={classes.submit} onClick={this.handleSubmit}>
                            Login
         </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login)
