import React from 'react'
import axios from '../config/axios';
import PgForm from './form'
import { Navbar } from 'reactstrap'

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
        axios.get(`/pgs/${id}`)
            .then((response) => {
                const pg = response.data
                console.log("raa", pg, 'pg')
                this.setState(() => ({ pg: response.data, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    submitHandle = (formData) => {
        const id = this.state.pg._id
        console.log("ro", formData)
        axios.put(`/pgs/${this.state.pg._id}`, formData)

            .then((response) => {
                const pg = response.data
                console.log("rak", pg)
                // this.props.history.push(`/pg/${pg._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        console.log(this.state.pg.pgName)
        return (

            <div className="wrapper">
                <div className="form-wrapper" >
                <h1 className='edit'>edit PG</h1>
                
                {this.state.isLoaded && <PgForm pgName={this.state.pg.pgName} address={this.state.pg.address} amenities={this.state.pg.amenities} deposit={this.state.pg.deposit} description={this.state.pg.description} foods={this.state.pg.foods} pgRent={this.state.pg.pgRent} pgTypes={this.state.pg.pgTypes} roomTypes={this.state.pg.roomTypes} rules={this.state.pg.rules} pgSubmitHandle={this.submitHandle} />}
                </div >
            </div>
        )
    }
}

export default PgEdit