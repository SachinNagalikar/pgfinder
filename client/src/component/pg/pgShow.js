// import React from "react"
// import axios from '../config/axios'
// import { Link } from 'react-router-dom'
// import Lightbox from 'react-image-lightbox';
// import  FixRating  from '../review/fixReview'
// import Reviews from '../review/review'
// import 'react-image-lightbox/style.css'
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, Button
// } from 'reactstrap'


// class PgShow extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             pg: {},
//             isLoaded: false,
//             photoIndex: 0,
//             isOpen: false,
//             average: 0
//         }
//     }

//     calculateRating = (pg) => {
//         let average = 0
//         let total = 0;
//         if (pg.review.length !== 0) {
//             pg.review.forEach(item => {
//                 total += item.rating
//             })
//             console.log("sanjay", total)
//             average = total / pg.review.length
//             this.setState(() => ({ average, pg }))
//         }
//     }

//     componentDidMount() {
//         const id = this.props.match.params.id
//         console.log('id', id)
//         axios.get(`/pgs/${id}`, {
//             headers: {
//                 'x-auth': localStorage.getItem('token')
//             }
//         })
//             .then((response) => {
//                 console.log(response.data)
//                 const pg = response.data
//                 this.setState(() => ({ pg, isLoaded: true }))
//                 this.calculateRating(pg)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     handleDelete = () => {
//         const confirmDelete = window.confirm('are you sure?')
//         if (confirmDelete) {
//             axios.delete(`/pgs/${this.state.pg._id}`, {
//                 headers: {
//                     'x-auth': localStorage.getItem('token')
//                 }
//             })
//                 .then(() => {
//                     this.props.history.push('/pg')
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//         }
//     }

//     render() {
//         const { photoIndex, isOpen } = this.state;
//         console.log('pgshow', this.state)
//         return (
//             <div>
//                 <div className="row">
                       
//                         {/* <CardImg width="200" height="150" src={this.state.pg.image}/> */}
//                         <Card>
//                         <CardBody>
//                         <div>
//                             {this.state.isLoaded &&
//                             <CardImg width="200" height="150" src={this.state.pg.image[0]} onClick={() => this.setState({ isOpen: true })} />
//                             }</div>
//                                 <CardTitle>{`PG Name:-${this.state.pg.pgName}`}</CardTitle>
//                                 {/* <CardSubtitle>{`Amenities:-${this.state.pg.amenities}`}</CardSubtitle> */}
//                                 <CardText>{`PG Type:-${this.state.pg.pgTypes}`}</CardText>
//                                 <CardText>{`Address:-${this.state.pg.address}`}</CardText>
//                             <iframe title={this.state.pg._id} width="300" height="150" src={`https://maps.google.com/maps?q=${this.state.pg.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe><br />
//                             <label>
//                     PG Rating
//                 </label>
//                 <FixRating average={this.state.average} />
//                <br/> {this.state.isLoaded &&
//                     <span>Total Reviews {this.state.pg.review.length}</span>
//                 }
//                 <br />
//                 {this.state.isLoaded &&
//                     <Reviews id={this.state.pg._id} pg={this.state.pg} calculateRating={this.calculateRating} />
//                 }<br/>
//                                 |<Button><Link to="/pg">back</Link></Button>|
//                             <Button onClick={this.handleDelete}>delete</Button>
//                         </CardBody>
//                     </Card>
//                     {isOpen && (
//                         <Lightbox
//                             mainSrc={this.state.pg.image[photoIndex]}
//                             nextSrc={this.state.pg.image[(photoIndex + 1) % this.state.pg.image.length]}
//                             prevSrc={this.state.pg.image[(photoIndex + this.state.pg.image.length - 1) % this.state.pg.image.length]}
//                             onCloseRequest={() => this.setState({ isOpen: false })}
//                             onMovePrevRequest={() =>
//                                 this.setState({
//                                     photoIndex: (photoIndex + this.state.pg.image.length - 1) % this.state.pg.image.length,
//                                 })
//                             }
//                             onMoveNextRequest={() =>
//                                 this.setState({
//                                     photoIndex: (photoIndex + 1) % this.state.pg.image.length,
//                                 })
//                             }
//                         />
//                     )}
//                 </div>
               
//             </div>
//         )
//     }
// }

// export default PgShow


import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import Lightbox from 'react-image-lightbox';
import  FixRating  from '../review/fixReview'
import Reviews from '../review/review'
import 'react-image-lightbox/style.css'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
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

class PgShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pg: {},
            isLoaded: false,
            photoIndex: 0,
            isOpen: false,
            average: 0
        }
    }

    calculateRating = (pg) => {
        let average = 0
        let total = 0;
        if (pg.review.length !== 0) {
            pg.review.forEach(item => {
                total += item.rating
            })
            console.log("sanjay", total)
            average = total / pg.review.length
            this.setState(() => ({ average, pg }))
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
                this.calculateRating(pg)
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
        var { photoIndex, isOpen } = this.state;
        console.log(this.state)
        const { classes } = this.props;
        return ( <main className={classes.main}>
            <Card className={classes.card}>
            <div>
                            {this.state.isLoaded &&
                            <CardMedia 
                            image={this.state.pg.image[0]}
                            onClick={() => this.setState({ isOpen: true })}
                            />
                           
                        }</div>
                <CardContent className={classes.cardContent}>
                       
                        <Typography>
                        {`PG Name:-${this.state.pg.pgName}`}
                    </Typography>
                                <Typography>{`Amenities:-${this.state.pg.amenities}`}</Typography>
                                <Typography>{`PG Type:-${this.state.pg.pgTypes}`}</Typography>
                                <Typography>{`Address:-${this.state.pg.address}`}</Typography>
                            <iframe title={this.state.pg._id} width="300" height="150" src={`https://maps.google.com/maps?q=${this.state.pg.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe><br />
                            <label>
                    PG Rating
                </label>
                <FixRating average={this.state.average} />
               <br/> {this.state.isLoaded &&
                    <span>Total Reviews {this.state.pg.review.length}</span>
                }
                <br />
                {this.state.isLoaded &&
                    <Reviews id={this.state.pg._id} pg={this.state.pg} calculateRating={this.calculateRating} />
                    }<br />
                    <CardActions>
                                |<Button><Link to="/pg">back</Link></Button>|
                            <Button onClick={this.handleDelete}>delete</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                    {isOpen && (
                        <Lightbox
                            mainSrc={this.state.pg.image[photoIndex]}
                            nextSrc={this.state.pg.image[(photoIndex + 1) % this.state.pg.image.length]}
                            prevSrc={this.state.pg.image[(photoIndex + this.state.pg.image.length - 1) % this.state.pg.image.length]}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + this.state.pg.image.length - 1) % this.state.pg.image.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % this.state.pg.image.length,
                                })
                            }
                />
                
                    )}
                </main>
        )
    }
}
PgShow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PgShow);