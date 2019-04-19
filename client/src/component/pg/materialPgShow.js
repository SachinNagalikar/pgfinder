import React from "react"
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import {PgEdit} from './editPg'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});



class PgShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pg: {},
            isLoaded: false,
            photoIndex: 0,
            isOpen: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log('id', id)
        axios.get(`/pgs/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response.data)
                const pg = response.data
                this.setState(() => ({ pg, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleDelete = () => {
        const confirmDelete = window.confirm('are you sure?')
        if (confirmDelete) {
            axios.delete(`/pgs/${this.state.pg._id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(() => {
                    this.props.history.push('/pg')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        console.log('pgshow', this.props)
        const { classes } = props;
        return (
            <React.Fragment>
                <CssBaseline />
 
                <main>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        <Grid item key={pg._id} sm={6} md={4} lg={3} container  >
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={pg.image[0]}
                                    onClick={() => this.setState({ isOpen: true })}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom component="h2">
                                        {`PG Name:-${pg.pgName}`}
                                    </Typography>
                                    <Typography>
                                        {`PG Address:-${pg.address}`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <iframe title={this.state.pg._id} width="300" height="150" src={`https://maps.google.com/maps?q=${this.state.pg.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe><br />
                                    |<Button><Link to="/pg">back</Link></Button>|
    <Button onClick={this.handleDelete}>delete</Button>                                    </CardActions>
                            </Card>
                            {isOpen && (
                                <Lightbox
                                    mainSrc={pg.image[photoIndex]}
                                    nextSrc={pg.image[(photoIndex + 1) % pg.image.length]}
                                    prevSrc={pg.image[(photoIndex + pg.image.length - 1) % pg.image.length]}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                    onMovePrevRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + pg.image.length - 1) % pg.image.length,
                                        })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + 1) % pg.image.length,
                                        })
                                    }
                                />
                            )}
                            )
                        })
                        }
            </Grid>


                    </div>
                </main>

            </React.Fragment>
        );
    }
}
PgShow.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PgShow);