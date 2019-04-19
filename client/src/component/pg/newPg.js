import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import PgForm from './form'

class PgNew extends React.Component {
    constructor() {
        super()
        this.submitHandle = this.submitHandle.bind(this)
    }
    submitHandle(data) {
        console.log(data, '----newpg')
        axios.post('/pgs', data, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log("new",response.data)
                const pg = response.data
                this.props.history.push(`/pg/${pg._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                        <PgForm pgSubmitHandle={this.submitHandle} />
                    </div>
                </div>

        )
    }
}

export default PgNew 