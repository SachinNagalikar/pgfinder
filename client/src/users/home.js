import React from 'react'
import { Input, Button } from 'reactstrap'


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            location: ''
        };

    }
    handleName = (event) => {
        const name = event.target.value;
        this.setState(() => ({ name }));
    };

    getLocation = (res) => {
        const location = res.target.value
        this.setState(() => ({ location }))
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div className="container">
                    <div className="col-md-5">
                        Location<br />
                        <Input type="text" name="text" onChange={this.handleName} /><br />
                        <Button color="primary" onClick={this.getLocation}>Location</Button> <br />
                    </div>
                    <iframe title="myFrame" width="500" height="300" src={`https://maps.google.com/maps?q=${this.state.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe>
                </div>
            </div>
        )
    }
}

export default Home
