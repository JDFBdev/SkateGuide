import React, {useEffect, useState} from "react";
import s from './TrickPage.module.css';
import skateboard from '../../img/skateboard.png';
import Transition from '../Transition/Transition';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function TrickPage({id, user}){
    const [trick, setTrick] = useState({name: '', rating: 0, description: '', type: '', video: ''});
    const [stances, setStances] = useState({Regular: false, Nollie: false, Fakie: false, Switch: false});
    const [skates,setSkates] = useState([...Array(0).keys()]);

    useEffect(()=>{
        async function fetchData() {
            let promise = {};
            if (!user){
                promise = await axios.get(`http://localhost:3001/findTrick/${id}/-1`)
            } else {
                promise = await axios.get(`http://localhost:3001/findTrick/${id}/${user}`)
            }
            let response = promise.data;
            if(response.hasOwnProperty('stances')){
                setStances(response.stances);
            }
            setTrick(response.trick);
            setSkates([...Array(response.rating).keys()])
        }
        fetchData();
    },[id, user])

    const handleStance = async function(e){
        if(user){
            if(!stances[e.target.id]){
                let promise = await axios.post(`http://localhost:3001/addStance`,{
                    username: user,
                    trick_id: id,
                    stance: e.target.id
                })
                let response = promise.data;

                if (!response.success){
                    toast.error(response.message);
                }
                else{
                    toast.success(response.message);
                    setStances(prev=>({...prev, [e.target.id]: true}))
                }
            } else {
                let promise = await axios.post(`http://localhost:3001/deleteStance`,{
                    username: user,
                    trick_id: id,
                    stance: e.target.id
                })
                let response = promise.data;

                if (!response.success){
                    toast.error(response.message);
                }
                else{
                    toast.success(response.message);
                    setStances(prev=>({...prev, [e.target.id]: false}))
                }
            }
        }
    }

    return(
        <div className={s.modal}>
            <div className={s.videoContainer}>
                {
                    (trick.name !== '') &&
                    <iframe className={s.video} src={trick.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                }
                
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
                            <button onClick={handleStance} id='Regular' className={stances.Regular ? s.stanceLearned : s.stance}>Regular</button>
                            <button onClick={handleStance} id='Fakie' className={stances.Fakie ? s.stanceLearned : s.stance}>Fakie</button>
                            <button onClick={handleStance} id='Nollie' className={stances.Nollie ? s.stanceLearned : s.stance}>Nollie</button>
                            <button onClick={handleStance} id='Switch' className={stances.Switch ? s.stanceLearned : s.stance}>Switch</button>
                        </div>
                    </div>
                </Transition>
            }
            </div>
        </div>
    )
}