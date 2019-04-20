
import React from 'react';
import '../../src/App.css'
import PropTypes from 'prop-types';
import axios from '../component/config/axios'
import { connect } from 'react-redux'
import { setUser } from '../component/redux/actions/user'
// import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
// import login from './login';

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
                    console.log(token)
                    localStorage.setItem('token', token)
                    this.props.dispatch(setUser(token))
                    this.setState(() => ({
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
            this.props.history.push('/pg')
        }
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
       </Typography>
                   <form className={classes.form} >
                       <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="email">Email Address</InputLabel>
                           <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.emailChange} autoFocus />
                           <FormLabel color="danger"  error={true}>{this.state.emailError}</FormLabel>
                       </FormControl>
                       <FormControl margin="normal" required fullWidth>
                           <InputLabel htmlFor="password">Password</InputLabel>
                           <Input name="password" id="password" autoComplete="current-password"
                               type={this.state.hidden ? "password" : "text"} value={this.state.password} onChange={this.passwordChange} />                                        <FormLabel color="danger"  error={true}>{this.state.passwordError}</FormLabel>
                       </FormControl>
                    
                       <Button fullWidth variant="contained" color="primary" value="submit"
                           className={classes.submit} onClick={this.handleSubmit}>
                           Sign in
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
export default withStyles(styles)(
    connect()(Login))
