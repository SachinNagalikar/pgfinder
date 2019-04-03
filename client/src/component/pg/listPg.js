import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import { Navbar, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'
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
                <h2>Listing PG's - {this.state.pgs.length}</h2><br/>
                    {this.state.pgs.map((pg) => {
                        return (<div key={pg._id}>
                        <Card>
                          <CardImg top width="100%" src="https://www.justdial.com/photos/seasons-womens-pg-and-hostel-madhapur-hyderabad-paying-guest-accommodation-for-women-c4x70-pc-45991500-sco-28eqymyyieq" alt="Card image cap" />
                          <CardBody>
                                    <CardTitle>{`pgName:-${pg.pgName}`}</CardTitle>
                                    <CardSubtitle>{`pgType:-${pg.pgTypes}`}</CardSubtitle>
                                    <CardText>{`description:-${pg.description}`}</CardText>
                                    <CardSubtitle>{`Address:-${pg.address}`}</CardSubtitle>
                                   
                            <Button color="success"><Link to={`/pg/${pg._id}`} >Details</Link> </Button>
                          </CardBody>
                        </Card>
                        </div>)
                    })}
                            
                 
                   </div>
                </div>         
      
        )
    }
}

export default PgList
{/* <li key={pg._id}><Link to={`/pg/${pg._id}`}>{pg.pgName}</Link> - {pg.description}</li> */}



