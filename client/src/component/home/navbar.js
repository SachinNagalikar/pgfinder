import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Admin from './adminrole';
import User from './user'

const Navbar = (props) => {
    const { isAuthenticated, user } = props.user
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark  " style={{backgroundColor:'#6a1b9a',opacity:"0.8"}} >
                <Link className="navbar-brand" to='/'>{' '}Paying Guest</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <div className="form-inline my-2 my-lg-0">
                        {
                            !isAuthenticated ? <>
                                <Link style={{marginLeft:"5px" } } className="btn btn-warning" to="/users/register" role="button">SIGN UP</Link>
                                <Link style={{marginLeft:"5px" } } className="btn btn-warning" to='/users/login' role="button">SIGN IN</Link>

                            </>
                                :

                                <>
                                    {user.role === 'admin' ?

                                        <Admin />
                                        :
                                        <User />
                                    }
                                </>


                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Navbar)