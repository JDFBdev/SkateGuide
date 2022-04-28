import React, {useState} from "react";
import s from './Log.module.css';
import Transition from '../Transition/Transition';
import toast from 'react-hot-toast';
import axios from 'axios';

export  function validate(input){
    let errors = {};
  
    if(input.user === ''){
        errors.user = 'Username is required'
    }
    if(input.pass === ''){
        errors.pass = 'Password is required'
    }
    if(input.username === ''){
        errors.username = 'Username is required'
    }
    if(input.email === ''){
        errors.email = 'Email is required'
    }
    if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = 'Invalid Email';
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

export default function Log(){
    const [log, setLog] = useState(true);
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
            if (response === 'Usuario Inexistente'){
                toast.error('Usuario Inexistente')
            }
            else if (response === 'Contraseña incorrecta'){
                toast.error('Contraseña incorrecta')
            }
            else{
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

            if (response === "Nombre de Usuario no disponible"){
                toast.error("Nombre de Usuario no disponible")
            }
            else if (response === "Mail ya registrado"){
                toast.error("Mail ya registrado")
            }
            else{
                toast.success('Registro exitoso!')
            }
        }

    }

    return(
        <>
            {
                log &&
                <Transition>
                    <div className={log ?  s.container : s.container2}>
                        <div className={s.header}>
                            <h1 className={s.title}>Log In</h1>
                            <div className={s.line}/>
                        </div>
                        <input className={s.input} placeholder="User or Email..." onChange={handleInput} id='user' style={{border: errors.user ? 'solid 1px rgb(127, 44, 44)' : 'none'}} />
                        <div className={s.passwordDiv}>
                            <input className={s.input2} type="password" placeholder="Password..." onChange={handleInput} id='pass' style={{border: errors.pass ? 'solid 1px rgb(127, 44, 44)' : 'none'}}/>
                            <p className={s.forgot}>Forgot Your Password?</p>
                        </div>
                        <div className={s.btnDiv}>
                            <button className={s.btnSubmit} onClick={handleSubmit} >Log In</button>
                            <p className={s.signUp} onClick={()=>{setLog(false); setInput(prev=>({...prev, user: '', pass: ''})); }}>Or Sing Up</p>
                        </div>
                    </div>
                </Transition>
            }
            {
                !log &&
                <Transition>
                    <div className={log ?  s.container : s.container2}>
                        <div className={s.header}>
                            <h1 className={s.title}>Sign Up</h1>
                            <div className={s.line}/>
                        </div>
                        <input className={s.input} placeholder="Username..." onChange={handleInput} id='username'/>
                        <input className={s.input} placeholder="Email..." onChange={handleInput} id='email'/>
                        <input className={s.input} type="password" placeholder="Password..." onChange={handleInput} id='pass1'/>
                        <input className={s.input} type="password" placeholder="Repeat Password..." onChange={handleInput} id='pass2'/>
                        <div className={s.btnDiv}>
                            <button className={s.btnSubmit} onClick={handleSubmit}>Sign Up</button>
                            <p className={s.signUp} onClick={()=>{setLog(true); setInput(prev=>({...prev, username: '', email: '', pass1: '', pass2: ''}))}}>Or Log In</p>
                        </div>
                    </div>
                </Transition>
            }
        </>
    )

}