import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import PgForm from './form'
import { Button } from 'reactstrap'

class PgNew extends React.Component {
    submitHandle = (data) => {
        axios.post('/pgs', data, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
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
            <div className="container" >
                <h2>Add PG</h2>
                <PgForm pgSubmitHandle={this.submitHandle} />
                <Button> <Link to="/pg">back</Link></Button>

            </div>
        )
    }
}

export default PgNew 