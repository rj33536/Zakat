import React, { useState } from "react";

import firebase from '../utils/firebase';
import UserContext from "../utils/UserContext"
export default function Search(props) {
    const [user, setUser] = useState({});
    const [donations,setDonations] = useState([]);
    React.useEffect(() => {
        let donations = [];
        firebase.database().ref('donations').once("value").then(function (snapshot) {
            snapshot.forEach((data) => {
                donations.push(data.val());
                console.log(data.val());
            })
        }).then(() => {
            donations = donations.filter((donation) => {
                return donation.phone === user.phone;
            })
            setDonations(donations)
        });


    }, []);


    return (
        <UserContext.Consumer>
            {
                (user) => {
                    return (
                        <div class="background">

                            <table id="allUsers" class="customers">
                                <th>Name</th>
                                <th>Phone No.</th>
                                <th>Profession</th>
                                <th>State</th>

                                {donations
                                    
                                    .map((donation, idx) => {
                                        return (

                                            <tr className="user-card" key={user.phone}>
                                                <td><h5>{user.fullname}</h5></td>
                                                <td><h5>{user.phone}</h5></td>
                                                <td className="">
                                                    {user.role ? user.role
                                                        .map((bubble) => {
                                                            return <div className="bubble">{bubble}</div>
                                                        })
                                                        : (<></>)}
                                                </td>
                                                <td><h5>{user.state}</h5></td>
                                            </tr>
                                        )
                                    })}
                            </table>
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
    )


}