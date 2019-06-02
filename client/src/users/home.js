import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles'
import LayoutBody from '../homeComponent/LayoutBody';
import Typography from '../homeComponent/Typography';
const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 10,
    },
  },
  more: {
    marginTop: theme.spacing.unit * 2,
  },
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

const backgroundImage =
'https://images.unsplash.com/photo-1557967107-ffa9582f8565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=40'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: ''
    };

  }
  handleName = (event) => {
    const name = event.target.value;
    this.setState(() => ({ name }));
  };

  getLocation = (res) => {
    const location = res.target.value
    this.setState(() => ({ location }))
    this.props.history.push('/pg')
  }

  render() {
    console.log(this.state)
    const { classes } = this.props;

    return (
      <main className={classes.main}>
          <img style={{ display: 'none' }} src={backgroundImage} alt="" />

        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            location
                    </Typography>

          <br/>
          <Input type="text" name="text" onChange={this.handleName} placeholder="write your location to find pgs" fullWidth />
          <Button fullWidth variant="contained" color="primary" value="submit"
            className={classes.submit} onClick={this.getLocation}>
            Get the PG's
                        </Button><br />
          <iframe title="myFrame" width="300" height="300" src={`https://maps.google.com/maps?q=${this.state.name+` pgs`}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe>
        </Paper>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Developed By Kumar sundram and Sachin Naglikar
                </Typography>
        </footer>
      </main>
    )
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);


