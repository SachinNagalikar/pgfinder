import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import PgForm from './form'
import { Button } from 'reactstrap'

class PgNew extends React.Component {
    submitHandle = (data) => {
        console.log('kumar', data.get('amenities'))
        // axios.post('/pgs', data, {
        //     headers: {
        //         'x-auth': localStorage.getItem('token')
        //     }
        // })
        //     .then((response) => {
        //         const pg = response.data
        //         console.log('ra', pg)
        //         this.props.history.push(`/pg/${pg._id}`)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    render() {
        return (
            <div >
                <h2>Add PG</h2>
                <PgForm pgSubmitHandle={this.submitHandle} />
                 <Link to="/pg">back</Link>

            </div>
        )
    }
}

export default PgNew 