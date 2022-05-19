import React from "react";
import s from './Profile.module.css';

export default function Profile({user}){

    const handleLogOut = function(){
        window.location.href = window.location.href;
    }

    return(
        <div className={s.container}>
            <div className={s.userImg}>{user.charAt(0)}</div>
            <h1 className={s.title}>{user}</h1>
            <p className={s.score}>Score: 12</p>
            <button className={s.btn} onClick={handleLogOut}>Log Out</button>
        </div>
    )
}