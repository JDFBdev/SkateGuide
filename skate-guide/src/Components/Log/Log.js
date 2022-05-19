import React, {useState} from "react";
import s from './Log.module.css';
import Transition from '../Transition/Transition';
import toast from 'react-hot-toast';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

export  function validate(input){
    let errors = {};
  
    if(input.user === '' && input.email === ''){
        errors.user = 'Username or email are required'
    }
    if(input.pass === ''){
        errors.pass = 'Password is required'
    }
    if(input.username === ''){
        errors.username = 'Username is required'
    }
    if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = 'Invalid Email';
    }
    if(input.email === ''){
        errors.email = 'Email is required'
    }
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

export default function Log({user, setUser}){
    const [log, setLog] = useState(true);
    const [change, setChange] = useState(false);
    const [input, setInput] = useState({user:'', pass: '', username:'', email: '', pass1: '', pass2: ''});
    const [errors, setErrors] = React.useState({});

    const handleInput = function(e){
        setInput(prevInput => ({...prevInput, [e.target.id]:e.target.value}));
    }

    const handleSubmit = async function(){

        let errors = validate(input);
        setErrors(errors);

        if (log && !errors.user && !errors.pass){
            let promise = await axios.post(`http://localhost:3001/login`,{
                username: input.user,
                password: input.pass
            })
            let response = promise.data;
            if (!response.success){
                toast.error(response.message)
            }
            else if(response.success){
                toast.success('Logged In!')
            }
        }

        else if (!log && !errors.username && !errors.email && !errors.pass1 && !errors.pass1) {
            let promise = await axios.post(`http://localhost:3001/register`,{
                username: input.username,
                mail: input.email,
                password: input.pass1
            })
            let response = promise.data;

            if (!response.success){
                toast.error(response.message)
            }
            else{
                toast.success('Successful Register')
                setLog(true);
                setErrors({});
            }
        }

    }

    const handleChange =  async function(e){
        e.preventDefault();
        let errors = validate(input);
        setErrors(errors);
        if (!errors.email){
            let promise = await axios.post(`http://localhost:3001/sendEmail`,{
                mail: input.email,
            })
            let response = promise.data;

            if (!response.success){
                toast.error(response.message);
            }
            else if (response.success){
                toast.success('An Email will be sent to your account with the following steps')
                setLog(true);
                setChange(false);
                setErrors({});
            }
        }
    }

    return(
        <>
            {
                (log && !change) &&
                <Transition>
                    <div className={log ?  s.container : s.container2}>
                        <div className={s.header}>
                            <h1 className={s.title}>Log In</h1>
                            <div className={s.line}/>
                        </div>
                        <input className={s.input} placeholder="User or Email..." onChange={handleInput} id='user' style={{border: errors.user ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='user'/>
                        <div className={s.passwordDiv}>
                            <input className={s.input2} type="password" placeholder="Password..." onChange={handleInput} id='pass' style={{border: errors.pass ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='pass'/>
                            <p className={s.forgot} onClick={()=> setChange(true)}>Forgot Your Password?</p>
                        </div>
                        <div className={s.btnDiv}>
                            <button className={s.btnSubmit} onClick={handleSubmit} >Log In</button>
                            <p className={s.signUp} onClick={()=>{setLog(false); setErrors({}); setInput(prev=>({...prev, user: '', pass: ''})); }}>Or Sing Up</p>
                        </div>
                    </div>
                </Transition>
            }
            {
                (!log && !change) &&
                <Transition>
                    <div className={log ?  s.container : s.container2}>
                        <div className={s.header}>
                            <h1 className={s.title}>Sign Up</h1>
                            <div className={s.line}/>
                        </div>
                        <input className={s.input} placeholder="Username..." onChange={handleInput} id='username'  style={{border: errors.username ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='username'/>
                        <input className={s.input} placeholder="Email..." onChange={handleInput} id='email' style={{border: errors.email ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='email'/>
                        <input className={s.input} type="password" placeholder="Password..." onChange={handleInput} id='pass1' style={{border: errors.pass1 ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='pass1'/>
                        <input className={s.input} type="password" placeholder="Repeat Password..." onChange={handleInput} id='pass2' style={{border: errors.pass2 ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='pass2'/>
                        <div className={s.btnDiv}>
                            <button className={s.btnSubmit} onClick={handleSubmit}>Sign Up</button>
                            <p className={s.signUp} onClick={()=>{setLog(true); setErrors({}); setInput(prev=>({...prev, username: '', email: '', pass1: '', pass2: ''}))}}>Or Log In</p>
                        </div>
                    </div>
                </Transition>
            }
            {
                change && 
                <Transition>
                    <div className={s.container3}>
                        <div className={s.header}>
                            <h1 className={s.title} style={{fontSize:'2.5rem'}}>Forgot Your password?</h1>
                            <div className={s.line}/>
                        </div>
                        <div className={s.passwordDiv}>
                            <input className={s.input2} placeholder="Email..." onChange={handleInput} id='email' style={{border: errors.email ? 'solid 1px rgb(127, 44, 44)' : 'solid 1px rgb(0, 0, 0, 0)'}} data-tip data-for='email'/>
                            <p className={s.signUp} style={{cursor: 'default'}}>An Email will be sent to your account with the following steps</p>
                        </div>
                        <div className={s.btnDiv}>
                            <button className={s.btnSubmit} onClick={handleChange}>Change Password</button>
                        </div>
                    </div>
                </Transition>
            }
            {
                Object.keys(errors).map((e)=>{
                    return (
                        <ReactTooltip key={e} id={e} place='top' effect="solid">
                            {errors[e]}
                        </ReactTooltip>
                    )
                })
            }
        </>
    )

}