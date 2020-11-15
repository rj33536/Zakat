import React, { useState } from "react";

import firebase from '../utils/firebase';
import IconButton from '@material-ui/core/IconButton';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import DonationCard from "./DonationCard";

export default function Search(props) {
    const [name, setName] = useState("");
    const [roles, setRoles] = useState([]);
    const [donations, setDonations] = useState([]);
    const changeSearch = (e) => {
        setName(e.target.value.toLowerCase());

    }

    const handleRoles = (e) => {
        let temp = roles;
        let isPresent = temp.filter((role) => {
            return role === e.target.value;
        })

        if (isPresent.length == 0) {
            console.log(e.target.value);
            temp.push(e.target.value);
            console.log(temp);
        } else {
            temp = temp.filter((role) => {
                return role !== e.target.value;
            })
        }

        setRoles(temp);
    }
    React.useEffect(() => {
        let usersdemo = [];
        firebase.database().ref('donations').once("value").then(function (snapshot) {
            snapshot.forEach((data) => {
                usersdemo.push(data.val());
            })
        }).then(() => { setDonations(usersdemo) });


    }, []);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {

        }
    }
    function showPosition(position) {
        console.log(position);
        alert(position.coords.latitude + " " + position.coords.longitude);
    }

    return (
        <div class="background">

            <div className="search">

                <input id="searchbar" placeholder="Search by Profession or Name OR STATE" type="text" onChange={changeSearch} />
                <IconButton onClick={getLocation} aria-label="location">
                    <LocationOnTwoToneIcon />
                </IconButton>
            </div>

           

            <table id="allUsers" class="customers">
                <th>Name</th>
                <th>Phone No.</th>
                <th>Profession</th>
                <th>State</th>

                {donations
                    .filter((donation) => {
                        if (donation.fullname)
                            return donation.fullname.toLowerCase().includes(name)
                                // || 
                                //  user.state.toLowerCase().includes(name)

                                ||
                                donation.role.filter((role) => {
                                    return role.toLowerCase().includes(name)
                                }).length != 0;



                        return false;
                    })
                    .map((donation, idx) => {
                        return <DonationCard donation={donation} />
                    })}
            </table>
        </div>
    )


}