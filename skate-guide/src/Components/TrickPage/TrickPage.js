import React, {useEffect, useState} from "react";
import s from './TrickPage.module.css';
import skateboard from '../../img/skateboard.png';
const axios = require('axios');

export default function TrickPage({id}){
    const [trick, setTrick] = useState(null);
    const [skates] = useState([...Array(trick.rating || 0).keys()]);

    useEffect(async ()=>{
        let promise = await axios.get(`http://localhost:3001/findTrick/${id}`)
        let response = promise.data;
        setTrick(response);
    },[])

    return(
        <div className={s.container}>
            <div className={s.data}>
                <div className={s.header}>
                    <h3 className={s.title} >{trick.name}</h3>
                    <div className={s.line}/>
                </div>
                <div className={s.emojis} >
                    {
                        skates.map(element => {
                            return <img className={s.skateboard} src={skateboard} alt='skateboard Emoji'/>
                        })
                    }
                </div>
                <div className={s.type} >{trick.type}</div>
                <p className={s.description} >
                    {trick.description}
                </p>
                <div className={s.stances}>
                    <button className={s.stance}>Regular</button>
                    <button className={s.stance}>Fakie</button>
                    <button className={s.stance}>Nollie</button>
                    <button className={s.stance}>Switch</button>
                </div>
                <iframe className={s.video} width="560" height="315" src={trick.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

        </div>

    )
}