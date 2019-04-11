import React from "react"
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'
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
        axios.get(`/pgs/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
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
        // console.log('pgshow', this.state)
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            {this.state.isLoaded &&
                                <CardImg width="200" height="150" src={this.state.pg.image[0]} onClick={() => this.setState({ isOpen: true })} />
                            }</div>
                        {/* <CardImg width="200" height="150" src={this.state.pg.image}/> */}
                        <Card>
                            <CardBody>
                                <CardTitle>{`PG Name:-${this.state.pg.pgName}`}</CardTitle>
                                <CardSubtitle>{`Amenities:-${this.state.pg.amenities}`}</CardSubtitle>
                                <CardText>{`PG Type:-${this.state.pg.pgTypes}`}</CardText>
                                <CardText>{`Address:-${this.state.pg.address}`}</CardText>
                                <iframe title={this.state.pg._id} width="300" height="150" src={`https://maps.google.com/maps?q=${this.state.pg.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe><br />
                                <Button><Link to={`/pg/edit/${this.state.pg._id}`}>edit</Link></Button>|<Button><Link to="/pg">back</Link></Button>|
                            <Button onClick={this.handleDelete}>delete</Button>
                            </CardBody>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default PgShow
