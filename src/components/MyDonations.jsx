import React, { useState } from "react";
import DonationCard from "./DonationCard";
import firebase from '../utils/firebase';
import UserContext from "../utils/UserContext"
export default function Search(props) {
    const [user, setUser] = useState({});
    const [donations, setDonations] = useState([]);
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
                                        return <DonationCard donation={donation}/>
                                    })}
                            </table>
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
    )


}