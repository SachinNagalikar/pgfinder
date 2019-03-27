import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import PgForm from './form'

class PgNew extends React.Component {
    submitHandle = (data) => {
        axios.post('/pgs', data)
            .then((response) => {
                const pg = response.data
                this.props.history.push(`/pg/${pg._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Add PG</h2>
                <PgForm pgSubmitHandle={this.submitHandle} />
                <Link to="/pg">back</Link>
            </div>
        )
    }
}

export default PgNew 