import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col
} from 'reactstrap'
import FilterPg from './filter'
class PgList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pgs: [],
            pgdata:[]

        }
    }
    componentDidMount() {
        axios.get('/pgs', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const pgs = response.data
                this.setState({
                    pgs,
                    pgdata:response.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    updatepg = (data) => {
        this.setState({ pgdata:data})
    }
    render() {
        return (
            <div className="color">
                <div className="container">
                <FilterPg pgdata={this.state.pgs} updatepg={this.updatepg}/>
                    <h2 className="list">Listing PG's - {this.state.pgdata.length}</h2><br />
                    {this.state.pgdata.map((pg) => {
                        return (<div key={pg._id} >
                            <Row>
                                <Col xs="6">
                                <Card>
                                <CardImg src='' alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{`PG Name:-${pg.pgName}`}</CardTitle>
                                    <CardSubtitle>{`PG Type:-${pg.pgTypes}`}</CardSubtitle>
                                    <CardText>{`description:-${pg.description}`}</CardText>
                                    <CardSubtitle>{`Address:-${pg.address}`}</CardSubtitle>
                            <Button outline color="primary"><Link to={`/pg/${pg._id}`} >Details</Link> </Button>
                                </CardBody>
                            </Card>
                                </Col>
                            </Row>
                        </div>)
                    })}
                </div>
             
            </div>
        )
    }
}
export default PgList