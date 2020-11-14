import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import firebase from "../utils/firebase"
import classes from './profile.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var stateData = require('../utils/state.json')

export default function PostJob() {
    const [user, setUser] = useState({});
    const { register, handleSubmit } = useForm();
    function onSubmitForm(data) {
        console.log(data);
        data["phone"] = user.phone;
        firebase.database().ref("/donations/").push(data).then((data) => {
            console.log(data.toString());
        }).catch(() => { }).finally(() => {
            console.log("posted donation")
            toast("posted donation");
        });

    }




    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            console.log(foundUser);
        } else {

        }

    }, []);
    return (
        <div class="m-5">
            <ToastContainer />
            <div className={classes.back}>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Donation title</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="title" ref={register} required placeholder="Enter Job Title" />
                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">State</label>
                        <div class="col-sm-10" >
                            <select class="form-control form-control-sm" name="state" ref={register} >
                                {
                                    stateData.map((data) => {
                                        return <option>{data}</option>
                                    })
                                }

                            </select>

                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Full Address</label>
                        <div class="col-sm-10">
                            <input type="tel" name="address" ref={register} class="form-control" required placeholder="Enter Address" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10" >
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" type="text" name="description" required defaultValue={user.adhaar} ref={register} placeholder="Enter Job Description" ></textarea>
                        </div>
                    </div>


                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0"> Donation type</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="role" ref={register} id="gridRadios1" value="Books" checked />
                                    <label class="form-check-label" for="gridRadios1">
                                        Books
          </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="role" ref={register} id="gridRadios2" value="Clothes" />
                                    <label class="form-check-label" for="gridRadios2">
                                        Clothes
          </label>
                                </div>
                                <div class="form-check disabled">
                                    <input class="form-check-input" type="checkbox" name="role" ref={register} id="gridRadios3" value="Others" />
                                    <label class="form-check-label" for="gridRadios3">
                                        Others
          </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="submit" class="btn btn-primary">Post Job</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}