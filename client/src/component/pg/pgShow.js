import React from "react"
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import { Navbar, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'
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
        axios.get(`/pgs/${id}`)
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
            axios.delete(`/pgs/${this.state.pg._id}`)
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
            <div className="wrapper">
                 <div className='form-wrapper'>
      <Card>
        <CardImg top width="100%" src="https://www.justdial.com/photos/seasons-womens-pg-and-hostel-madhapur-hyderabad-paying-guest-accommodation-for-women-c4x70-pc-45991500-sco-28eqymyyieq" />
        <CardBody>
                            <CardTitle>{`pgName:-${this.state.pg.pgName}`}</CardTitle>
                            <CardSubtitle>{`Amenities:-${this.state.pg.amenities}`}</CardSubtitle>
                            <CardText>{`pgTypes:-${this.state.pg.pgTypes}`}</CardText>
                            <CardText>{`Address:-${this.state.pg.address}`}</CardText>
                            <iframe width="500" height="300" src={`https://maps.google.com/maps?q=${this.state.pg.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} />
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
