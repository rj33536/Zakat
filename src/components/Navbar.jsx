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
                            <nav className="navbar navbar-expand-lg">
                                <Link to="/"><span className="navbar-brand" >Zakat</span></Link>

                                <div className="navbar-toggler" type="div" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </div>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">

                                    </ul>


                                    {
                                        user ?

                                            (<div>
                                                <div className="btn btn-info m-2  " onClick={props.Logout}>logout</div>

                                                <Link to="/profile"><div className="btn btn-info m-2 ">Profile</div></Link>
                                                <Link to="/search"><div className="btn btn-info m-2 ">Search</div></Link>
                                                <Link to="/donate"><div className="btn btn-info m-2 ">Donate</div></Link>
                                                <Link to="/mydonations "><div className="btn btn-info m-2 ">My Donations</div></Link>
                                            </div>

                                            ) :
                                            <div>
                                                <Link to="/login"><div className="btn btn-info m-2 " onClick={() => props.setSection("login")}>Login</div></Link>
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