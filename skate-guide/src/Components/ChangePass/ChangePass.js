import React, {useState} from "react";
import s from './ChangePass.module.css';
import { useNavigate, useParams } from 'react-router-dom'
import Transition from "../Transition/Transition";
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Buffer} from 'buffer';

export  function validate(input){
    let errors = {};
  
    if(input.pass1 === ''){
        errors.pass1 = 'Password is required'
    }
    if(input.pass1.length < 8){
        errors.pass1 = 'Password must be at least 8 characters long'
    }
    if(input.pass2 === ''){
        errors.pass2 = 'Repeat password'
    }
    if (input.pass1 !== input.pass2) {
        errors.pass1 = "Passwords don't match";
    }
    
    return errors;
}

export default function ChangePass(){
    const [input, setInput] = useState({user:'', pass: '', username:'', email: '', pass1: '', pass2: ''});
    const [errors, setErrors] = React.useState({});
    const {param} = useParams();
    const user = Buffer.from(param, "base64").toString();
    const Navigate = useNavigate();

    const handleInput = function(e){
        setInput(prevInput => ({...prevInput, [e.target.id]:e.target.value}));
    }

    const handleSubmit = async function(e){
        e.preventDefault();
        let errors = validate(input);
        setErrors(errors);
        
        if (!errors.pass1 && !errors.pass2){
            let promise = await axios.post(`https://skate-guide-backend.herokuapp.com/changePassword`,{
                user: user,
                pass: input.pass1
            })
            let response = promise.data;

            if (!response.success){
                toast.error('Problem updating password. Try again later.');
            }
            else if (response.success){
                toast.success('Password Updated')
                setErrors({});
                Navigate('/')
            }
        }
    }

    return(
        <div className={s.app}>
                <div className={s.navbar1} >
                    <h1 className={s.navbarTitle} onClick={()=>{Navigate('/')}}>The SB Trick Guide</h1>
                </div>
            <Transition>
                <div className={s.container}>
                    <div className={s.header}>
                        <h1 className={s.title}>Change Password</h1>
                        <div className={s.line}/>
                    </div>
                    <h3 className={s.userName}>{user}</h3>
                    <input className={s.input} type="password" placeholder="Password..." onChange={handleInput} id='pass1' style={{border: errors.pass1 ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='pass1'/>
                    <input className={s.input} type="password" placeholder="Repeat Password..." onChange={handleInput} id='pass2' style={{border: errors.pass2 ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='pass2'/>
                    <button className={s.btnSubmit} onClick={handleSubmit}>Change</button>

                </div>
            </Transition>
            {
                Object.keys(errors).map((e)=>{
                    return (
                        <ReactTooltip key={e} id={e} place='top' effect="solid">
                            {errors[e]}
                        </ReactTooltip>
                    )
                })
            }
        </div>
    )
}