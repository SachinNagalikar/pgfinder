import React from "react"
import axios from '../config/axios'
import { Link } from 'react-router-dom'

class PgShow extends React.Component {
    constructor() {
        super()
        this.state = {
            pg: [],
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
            <div>
                <h2>{this.state.pg.pgName}</h2>
                <p>{this.state.pg.amenities} -{this.state.pg.pgTypes} </p>
                {this.state.isLoaded && this.state.pg.image.map((img, i) => {
                    return < img key={i + 1} src={img} alt="empty" />
                })}<br />
                <Link to={`/pg/edit/${this.state.pg._id}`}>edit</Link>  |  <Link to="/pg">back</Link><br /><br />
                <button onClick={this.handleDelete}>delete</button>

            </div>
        )
    }
}

export default PgShow