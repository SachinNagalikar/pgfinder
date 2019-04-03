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
                <div className="container" >

                    <Navbar color="light" expand="md">
                        <div className="col-md-8" >
                            {/* <h2>Add PG</h2> */}
                            <PgForm pgSubmitHandle={this.submitHandle} />
                            <Button> <Link to="/pg">back</Link></Button>
                        </div>
                    </Navbar>
                </div>
            </div>
        )
    }
}

export default PgNew 