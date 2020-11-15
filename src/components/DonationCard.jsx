import React from 'react';

export default function DonationCard(props) {
    console.log(props.donation);
    return (
        <div className="card p-2">
            <h3 className="card-title">{props.donation.title}</h3>
            <div className="card-body">
                <p className="card-text">{props.donation.description}</p>
                <p className="card-text">{props.donation.role}</p>
                <p className="card-text">{[props.donation.address]}</p>
            </div>
            {
                props.donation.phone == props.user.phone ?
                    (
                        <button className="btn btn-secondary">
                            Verify
                        </button>
                    ) : (<button className="btn btn-secondary">
                        Refer
                    </button>)
            }
        </div>

    )
}