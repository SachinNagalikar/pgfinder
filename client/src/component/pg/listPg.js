import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import {pgShow  } from "./pgShow";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import FilterPg from './filter'

class PgList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pgs: [],
            actualPgs: [],
            isLoaded: false,
            isOpen: false,
            photoIndex: 0
        }
    }

    onFilterChange(change) {
        let pg = this.filterPGs(change);
        this.setState({ pgs: pg });
    }

    filterPGs(change) {
        let pg = [...this.state.actualPgs];
        if (change.pgTypes.Boys) {
            pg = pg.filter(x => x.pgTypes === "Boys");
        }
        else if (change.pgTypes.Girls) {
            pg = pg.filter(x => x.pgTypes === "Girls");
        }
        let localPg = { singleShare: [], twoSharing: [], threeSharing: [], fourSharing: [] };
        let hasFilter = false;
        if (change.roomTypes.singleSharing.value) {
            localPg.singleShare = pg.filter(x => x.roomTypes.includes(change.roomTypes.singleSharing.name));
            hasFilter = true;
        }
        if (change.roomTypes.twoSharing.value) {
            localPg.twoSharing = pg.filter(x => x.roomTypes.includes(change.roomTypes.twoSharing.name));
            hasFilter = true;
        }
        if (change.roomTypes.threeSharing.value) {
            localPg.threeSharing = pg.filter(x => x.roomTypes.includes(change.roomTypes.threeSharing.name));
            hasFilter = true;
        }
        if (change.roomTypes.fourSharing.value) {
            localPg.fourSharing = pg.filter(x => x.roomTypes.includes(change.roomTypes.fourSharing.name));
            hasFilter = true;
        }
        if (hasFilter) {
            pg = this.findUnique(localPg.singleShare.concat(localPg.twoSharing).concat(localPg.threeSharing).concat(localPg.fourSharing), d => d._id);
        }
        return pg;
    }

    findUnique(arr, predicate) {
        var found = {};
        arr.forEach(d => {
            found[predicate(d)] = d;
        });
        return Object.keys(found).map(key => found[key]);
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
                    pgs: pgs, actualPgs: pgs, isLoaded: true
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    reset() {
        let pg = [...this.state.actualPgs]
        this.setState({ pgs: pg })
    }
    render() {
        const { photoIndex, isOpen } = this.state;
        return (
            <div >
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2 className="form">Filter</h2>
                            <FilterPg onFilterChange={this.onFilterChange.bind(this)}
                                reset={this.reset.bind(this)} />
                        </div>
                        <div className="col-md-8">
                            <h2 >Listing PG's - {this.state.pgs.length}</h2>
                            
                            {this.state.pgs.map((pg) => {
                                return (<div className="form-wrapper" key={pg._id} >
                                    <Row>
                                        <Col>
                                            <Card>
                                                {/* <CardImg width="300" height="150" src={pg.image[0]} /> */}
                                                <CardImg width="200" height="150" src={pg.image[0]} onClick={() => this.setState({ isOpen: true })} />
                                                <CardBody>
                                                    <CardTitle>{`PG Name:-${pg.pgName}`}</CardTitle>
                                                    <CardSubtitle>{`PG Type:-${pg.pgTypes}`}</CardSubtitle>
                                                    <CardText>{`description:-${pg.description}`}</CardText>
                                                    <CardSubtitle>{`Address:-${pg.address}`}</CardSubtitle>
                                                    <Button outline color="primary"><Link to={`/pg/${pg._id}`} >Details</Link> </Button>
                                                </CardBody>
                                            </Card>
                                            {isOpen && (
                                                <Lightbox
                                                    mainSrc={pg.image[photoIndex]}
                                                    nextSrc={pg.image[(photoIndex + 1) % pg.image.length]}
                                                    prevSrc={pg.image[(photoIndex + pg.image.length - 1) % pg.image.length]}
                                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                                    onMovePrevRequest={() =>
                                                        this.setState({
                                                            photoIndex: (photoIndex + pg.image.length - 1) % pg.image.length,
                                                        })
                                                    }
                                                    onMoveNextRequest={() =>
                                                        this.setState({
                                                            photoIndex: (photoIndex + 1) % pg.image.length,
                                                        })
                                                    }
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                  
                                </div>)
                                  
                            })}
                                </div>
                        </div>
                    </div>
            </div>
        )
    }
}
export default PgList