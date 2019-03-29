import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import {} from 'reactstrap'
class PgList extends React.Component {
    constructor() {
        super()
        this.state = {
            pgs: []
        }
    }
    componentDidMount() {
        axios.get('/pgs')
            .then((response) => {
                const pgs = response.data
                this.setState({
                    pgs
                })
            })
            .catch((err) => {
           //     console.log(err)
            })
    }
    render() {
        return (
            <div>
                  <div className="container" >
            <div className="row">
                        <div className="col-md-2"></div>
                        <h2>Listing PG's - {this.state.pgs.length}</h2>
                <ul>
                    {this.state.pgs.map((pg) => {
                        return <li key={pg._id}><Link to={`/pg/${pg._id}`}>{pg.pgName}</Link> - {pg.description}</li>
                    })}
                </ul>
                    </div>
                </div>         
            </div>
        )
    }
}

export default PgList