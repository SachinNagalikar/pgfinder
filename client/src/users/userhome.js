import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '../homeComponent/Button';
import Typography from '../homeComponent/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import ProductHowItWork from './ProductHowItWork'
const backgroundImage =
'https://images.unsplash.com/photo-1557967107-ffa9582f8565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=40'
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
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
          {/* Increase the network loading priority of the background image. */}
          
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Paying Guest
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        The place where it feels like home.
      </Typography>
          {!localStorage.getItem("token")&&
              <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  className={classes.button}
                  component={linkProps => (
                      <Link {...linkProps} href="/users/register" variant="button" />
                  )}
              >
                  Register
      </Button>}
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);