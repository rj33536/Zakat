import React from 'react';
import './DonationCard.css';
export default function DonationCard(props) {
    console.log(props.donation);
    return (
        <div className="card p-3" >
            <h3 className="card-title">{props.donation.title}</h3>
            <div className="grid">
            <div className="donimg">
                <img src="https://www.allsaintsclaytonlemoors.org/wp-content/uploads/2020/08/C7A4DCB2-06FB-4576-A20E-3F64643938C9.jpeg"></img>
            </div>


            <div className="card-body">
                <p className="card-text"><span><h4>Description</h4></span>{props.donation.description}</p>
                <p className="card-text"> <span><h6>Tags</h6></span>{props.donation.role}</p>
                <p className="card-text"> <span><h6>Address</h6></span>{[props.donation.address]}</p>
                  
            {
                props.donation.phone == props.user.phone ?
                    (
                        <button className="btn btn-success">
                            Verify
                        </button>
                    ) : (<button className="btn btn-success">
                        Refer
                    </button>)
            }
            </div>
            </div>
         
        </div>

    )
}