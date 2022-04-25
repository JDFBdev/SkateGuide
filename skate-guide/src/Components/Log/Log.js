import React from "react";
import s from './Log.module.css';

export default function Log(){

    return(
        <div className={s.container}>
            <div className={s.header}>
                <h1 className={s.title}>Log In</h1>
                <div className={s.line}/>
            </div>
            <input className={s.input} placeholder="User or Email..."/>
            <div className={s.passwordDiv}>
                <input className={s.input2} placeholder="Password..."/>
                <p className={s.forgot}>Forgot Your Password?</p>
            </div>
            <div className={s.btnDiv}>
                <button className={s.btnSubmit}>Log In</button>
                <p className={s.signUp}>Or Sing Up</p>
            </div>
        </div>
    )

}