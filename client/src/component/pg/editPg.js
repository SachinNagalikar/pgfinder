import React from 'react'
import axios from '../config/axios';
import PgForm from './form'
import { Link } from 'react-router-dom'

class PgEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            pg: {},
            isLoaded: ''
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
                console.log("raa", pg, 'pg')
                this.setState(() => ({ pg: response.data, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    submitHandle = (data) => {
        //console.log("pgeditSubmit", formData.get('amenities'))
        var formData = {}
        for (var pair of data.entries()) {
            formData[pair[0]]=pair[1]
        }
        axios.put(`/pgs/${this.state.pg._id}`, formData, {
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
        console.log(this.state.pg)
        return (
            <div className="container">
                <h2 className='add'> edit PG</h2>
                {this.state.isLoaded && <PgForm pgName={this.state.pg.pgName} address={this.state.pg.address} amenities={this.state.pg.amenities.join(',').split(',')} deposit={this.state.pg.deposit} description={this.state.pg.description} foods={this.state.pg.foods} pgRent={this.state.pg.pgRent} pgTypes={this.state.pg.pgTypes} filename={this.state.pg.filename} roomTypes={this.state.pg.roomTypes.join(',').split(',')} rules={this.state.pg.rules} pgSubmitHandle={this.submitHandle} />}
                <Link to="/pg">back</Link>
            </div>
        )
    }
}

export default PgEdit