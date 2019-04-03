import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import PgForm from './form'
import { Navbar, Button } from 'reactstrap'

class PgNew extends React.Component {
    submitHandle = (data) => {
        console.log('kumar', data)
        axios.post('/pgs', data)
            .then((response) => {
                const pg = response.data
                console.log('ra', pg)
                this.props.history.push(`/pg/${pg._id}`)
            })
            .catch((err) => {
               console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div className="col" >
                    {/* <h2>Add PG</h2> */}
                    <Button> <Link to="/pg">back</Link></Button>
                            <PgForm pgSubmitHandle={this.submitHandle}  />

                </div>
            </div>
        )
    }
}

export default PgNew 