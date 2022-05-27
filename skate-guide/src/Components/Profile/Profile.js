import React from "react";
import s from './Profile.module.css';
import axios from "axios";

export default function Profile({user, setUser, data, setData}){

    const handleLogOut = async function(){
        await axios.post('https://skate-guide-backend.herokuapp.com/logout').then((response)=>{
            setUser('')
            setData({});
            window.location.reload();
        })
    }

    return(
        <div className={s.container}>
            <div className={s.userImg}>{user.charAt(0)}</div>
            <h1 className={s.title}>{user}</h1>
            <p className={s.score}>Score: {data.points}</p>
            <button className={s.btn} onClick={handleLogOut}>Log Out</button>
        </div>
    )
}