import React, { useState } from "react";
import DonationCard from "./DonationCard";
import firebase from '../utils/firebase';
import UserContext from "../utils/UserContext"
export default function Search(props) {

    const [donations, setDonations] = useState([]);
    React.useEffect(() => {
        let donationsH = [];
        firebase.database().ref('donations').once("value").then(function (snapshot) {
            snapshot.forEach((data) => {
                donationsH.push(data.val());
                console.log(data.val());
            })
        }).then(() => {

            setDonations(donationsH)
        });


    }, []);


    return (
        <UserContext.Consumer>
            {
                (user) => {
                    return (
                        <div class="background">
                            {donations
                                .filter((donation) => {
                                    return donation.phone === user.phone;
                                })
                                .map((donation, idx) => {
                                    return <DonationCard donation={donation} user={user} />
                                })}
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
    )


}