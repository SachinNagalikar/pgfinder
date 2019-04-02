import React from "react"
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import { Navbar, Button } from 'reactstrap'
class PgShow extends React.Component {
    constructor() {
        super()
        this.state = {
            pg: {},
            isLoaded: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/pgs/${id}`)
            .then((response) => {
                const pg = response.data
                this.setState(() => ({ pg, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleDelete = () => {
        const confirmDelete = window.confirm('are you sure?')
        if (confirmDelete) {
            axios.delete(`/pgs/${this.state.pg._id}`)
                .then(() => {
                    this.props.history.push('/pg')
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    render() {
        return (
            <div>
                <div className="container" >
                    <Navbar color="light" expand="md">
                        <div className="row">
                            {/* <div className="col-md-2" ></div> */}
                            <p>{this.state.pg.pgName}</p><br />
                            <p>{this.state.pg.amenities} -{this.state.pg.pgTypes} </p>
                            <br />
                            {/* {this.state.isLoaded && this.state.pg.image.map((img, i) => {
                                return < img key={i + 1} src={img} alt="empty" />
                            })}
                            <br /> */}
                            <Button><Link to={`/pg/edit/${this.state.pg._id}`}>edit</Link></Button>  |<Button><Link to="/pg">back</Link></Button><br />
                            <Button onClick={this.handleDelete}>delete</Button>
                        </div>
                    </Navbar>
                </div>
            </div>
        )
    }
}

export default PgShow