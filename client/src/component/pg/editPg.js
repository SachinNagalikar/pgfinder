import React from 'react'
import axios from '../config/axios';
import PgForm from './form'


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
                console.log(pg,'pg')
                this.setState(() => ({ pg, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    pgsubmitHandle = (formData) => {
        console.log(formData)
        //axios.put(`/pgs/${this.state.pg._id}`, formData)
        
            // .then((response) => {
            //     const pg = response.data
            //     this.props.history.push(`/pg/${pg._id}`)
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
    }


    render() {
        console.log(this.state.pg.pgName)
        return (
            <div>
                <h2>edit PG</h2>
                {this.state.isLoaded && <PgForm pgName={this.state.pg.pgName} address={this.state.pg.address} amenities={this.state.pg.amenities.join(' ').split(',')} deposit={this.state.pg.deposit} description={this.state.pg.description} foods={this.state.pg.foods} pgRent={this.state.pg.pgRent} pgTypes={this.state.pg.pgTypes} roomTypes={this.state.pg.roomTypes.join(' ').split(',')} rules={this.state.pg.rules} filename={this.state.pg.filename} pgSubmitHandle={this.pgsubmitHandle} />}
            </div>
        )
    }
}

export default PgEdit