import React, { useState } from "react";

import firebase from '../utils/firebase';
import IconButton from '@material-ui/core/IconButton';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import DonationCard from "./DonationCard";
import UserContext from "../utils/UserContext";
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
                console.log(data.val());
                usersdemo.push(data.val());
            })
        }).then(() => {
            console.log(usersdemo);
            setDonations(usersdemo)
        });


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
    console.log(donations)
    return (
        <UserContext.Consumer>
            {
                (user) => {
                    return (
                        <div class="background container">

                            <div className="search">

                                <input id="searchbar" placeholder="Search by Profession or Name OR STATE" type="text" onChange={changeSearch} />
                                <IconButton onClick={getLocation} aria-label="location">
                                    <LocationOnTwoToneIcon />
                                </IconButton>
                            </div>




                            {donations

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