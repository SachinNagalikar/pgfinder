import React from 'react'
import axios from '../component/config/axios'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedToken: localStorage.getItem('token')
        }
    }

    componentDidMount() {
        console.log('compon logout')
        axios.delete('/users/logout')
            .then((response) => {
                console.log(response)
                localStorage.removeItem('token')
                this.props.history.push('/users/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default Logout