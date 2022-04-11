import React, { useState } from "react";
import s from './TrickBtn.module.css';
import skateboard from '../../img/skateboard.png';

export default function TrickBtn({name, score,onClick}){
    const [skates] = useState([...Array(score).keys()])

    return(
        <div className={s.trick} onClick={onClick}>
            <p className={s.trickName}>{name}</p>
            <div className={s.emojis} >
                {
                    skates.map(element => {
                        return <img className={s.skateboard} src={skateboard} alt='skateboard Emoji'/>
                    })
                }
            </div>
        </div>
    )
}