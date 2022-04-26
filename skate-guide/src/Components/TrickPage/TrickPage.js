import React, {useEffect, useState} from "react";
import s from './TrickPage.module.css';
import skateboard from '../../img/skateboard.png';
import Transition from '../Transition/Transition';
import axios from 'axios';

export default function TrickPage({id}){
    const [trick, setTrick] = useState({name: '', rating: 0, description: '', type: '', video: ''});
    const [skates,setSkates] = useState([...Array(0).keys()]);

    useEffect(()=>{
        async function fetchData() {
            let promise = await axios.get(`http://localhost:3001/findTrick/${id}`)
            let response = promise.data;
            setTrick(response);
            setSkates([...Array(response.rating).keys()])
        }
        fetchData();
    },[id])

    return(
        <div className={s.modal}>
            <div className={s.videoContainer}>
                <iframe className={s.video} src={trick.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            </div>
            <div className={s.container}>
            {
                (trick.name === '') ? 
                <div>
                    <Transition>
                        <img alt='loadingskate' className={s.loading}  src={skateboard}/>
                    </Transition>
                </div> :
                <Transition>
                    <div className={s.data}>
                        <div className={s.header}>
                            <h3 className={s.title} >{trick.name}</h3>
                            <div className={s.line}/>
                        </div>
                        <div className={s.emojis} >
                            {
                                skates.map((element,i) => {
                                    return <img className={s.skateboard} src={skateboard} alt='skateboard Emoji' key={i}/>
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
                    </div>
                </Transition>
            }
            </div>
        </div>
    )
}