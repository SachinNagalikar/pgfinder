import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import { Navbar } from 'reactstrap'
import Home from '../../users/home'
class PgList extends React.Component {
    constructor(props) {
        super(props)
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
            console.log(err)
            })
    }    
    render() {
        return (
            <div>
                  <div className="container" >
                    <Navbar color="light"  expand="md">
                        <div className="col-md-1"></div>
                        <h2>Listing PG's - {this.state.pgs.length}</h2><br/>

                        <h5>
                            
                    {this.state.pgs.map((pg) => {
                        return <li key={pg._id}><Link to={`/pg/${pg._id}`}>{pg.pgName}</Link> - {pg.description}</li>
                    })}
                            </h5>
                            </Navbar>
                    </div>
                </div>         
      
        )
    }
}

export default PgList