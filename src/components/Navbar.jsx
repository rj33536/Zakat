import React from "react";
import { Link } from 'react-router-dom';
import UserContext from "../utils/UserContext";
export default function MenuNavbar(props) {

    return (
        <UserContext.Consumer>
            {
                (user) => {
                    return (
                        <div>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <Link to="/"><span className="navbar-brand" >Zakat</span></Link>

                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">

                                    </ul>


                                    {
                                        user ?

                                            (<div>
                                                <button className="btn btn-info m-2  " onClick={props.Logout}>logout</button>

                                                <Link to="/profile"><button className="btn btn-info m-2 ">Profile</button></Link>
                                                <Link to="/search"><button className="btn btn-info m-2 ">Search</button></Link>
                                                <Link to="/donate"><button className="btn btn-info m-2 ">Donate</button></Link>
                                                <Link to="/refer"><button className="btn btn-info m-2 ">Refer</button></Link>
                                                <Link to="/mydonations "><button className="btn btn-info m-2 ">My Donations</button></Link>
                                            </div>

                                            ) :
                                            <div>
                                                <Link to="/login"><button className="btn btn-info m-2 " onClick={() => props.setSection("login")}>Login</button></Link>
                                            </div>

                                    }

                                </div>
                            </nav>
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
    )
}