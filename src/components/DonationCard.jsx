import React from 'react';

export default function DonationCard(props) {
    return (
        <tr className="user-card" key={props.donation.phone}>
            <td><h5>{props.donation.fullname}</h5></td>
            <td><h5>{props.donation.phone}</h5></td>
            <td className="">
                {props.donation.role ? props.donation.role
                    .map((bubble) => {
                        return <div className="bubble">{bubble}</div>
                    })
                    : (<></>)}
            </td>
            <td><h5>{props.donation.state}</h5></td>
            <td><button>
                {/***
                 here comes the refer and verify button. after the donation has been recieved, it will say delivered
                 status:- listed, delivered
                 buttons:-verify(if this is my own donation), otherwise refer
                 on clicking refer I'll get a pin which will be used later to verify while collectings
                 */}
                
                </button></td>
        </tr>
    )
}