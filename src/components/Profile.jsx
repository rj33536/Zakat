import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import firebase from "../utils/firebase"
import classes from './profile.module.css';
import UserContext from "../utils/UserContext"
import { indigo } from '@material-ui/core/colors';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
var stateData = require('../utils/state.json')
export default function WorkerForm(props) {
    const [phone, setPhone] = useState();
    const { register, handleSubmit } = useForm();
    function onSubmitForm(data) {
        console.log(data);

        data["phone"] = phone;
        firebase.database().ref("/userdetail/" + phone).update(data).then((res) => {
            console.log(data);
            localStorage.setItem("user", res)
        }).catch((err) => { console.log(err) }).finally(() => {
            // toast("Profile Updated");
            console.log("posted job")
        });

    }

    return (

        <UserContext.Consumer>
            {
                (user) => {
                    setPhone(user.phone)
                    return (
                        <div className={classes.back}>
                            {/* <ToastContainer /> */}
                            <img  class= "prfimg" alt =''src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTFnG0huY6whcqQtmgJDP7XgSb8VCpmLUnKXw&usqp=CAU"></img>
                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Full Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" name="fullname" ref={register} placeholder="Enter your full name" defaultValue={user.fullname} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Phone No</label>
                                    <div class="col-sm-10">
                                        <p>{phone}</p>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Gender</label>
                                    <div class="col-sm-10">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" ref={register} type="radio" name="Gender" id="inlineRadio1" value="Male" />
                                            <label class="form-check-label" for="inlineRadio1">Male</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" ref={register} type="radio" name="Gender" id="inlineRadio2" value="Female" />
                                            <label class="form-check-label" for="inlineRadio2">Female</label>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">State</label>
                                    <div class="col-sm-10" >
                                        <select class="form-control form-control-sm" name="state" ref={register} defaultValue={user.stateData} >
                                            {
                                                stateData.map((data) => {
                                                    return <option>{data}</option>
                                                })
                                            }

                                        </select>

                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Address</label>
                                    <div class="col-sm-10">
                                        <input type="tel" name="address" ref={register} class="form-control" defaultValue={user.address} id="inputPassword3" placeholder="Enter Address" />
                                    </div>
                                </div>



                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Aadhar Card No</label>
                                    <div class="col-sm-10">
                                        <input type="tel" class="form-control" name="adhaar" defaultValue={user.adhaar} ref={register} id="inputPassword3" placeholder="Enter Aadhar Card No" />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-10">
                                        <button type="submit" class="btn btn-primary ">Update Profile</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
    )
}