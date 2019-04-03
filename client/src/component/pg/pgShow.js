import React from "react"
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'
class PgShow extends React.Component {
    constructor() {
        super()
        this.state = {
            pg: {},
            isLoaded: false
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
        return (
            <div>
                <div className="container">
                    <Card>
                        <CardImg top width="100%" />
                        <CardBody>
                            <CardTitle>{`pgName:-${this.state.pg.pgName}`}</CardTitle>
                            <CardSubtitle>{`Amenities:-${this.state.pg.amenities}`}</CardSubtitle>
                            <CardText>{`pgTypes:-${this.state.pg.pgTypes}`}</CardText>
                            <CardText>{`Address:-${this.state.pg.address}`}</CardText>
                            <iframe title={this.state.pg._id} width="500" height="300" src={`https://maps.google.com/maps?q=${this.state.pg.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe>
                            <Button><Link to={`/pg/edit/${this.state.pg._id}`}>edit</Link></Button>|<Button><Link to="/pg">back</Link></Button>|
                            <Button onClick={this.handleDelete}>delete</Button>
                        </CardBody>
                    </Card>
                </div>

            </div>
        )
    }
}

export default PgShow
